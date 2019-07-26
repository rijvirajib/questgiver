import { AttributeModel } from './attribute.model'
import { ItemModel, EQUIP_CLASS } from './item.model'
import { TARGET_TYPE, TargetModifier, TARGET_MODIFIER_RUNNER } from './target-modifier.model'
import { v4 as uuid } from 'uuid'

export class NPCModel {

  static equipItem(npc: NPCModel, item: ItemModel): NPCModel {
    // Attributes First
    npc.gear[item.equipClass] = item
    item.attributes.forEach(attribute => {
      npc = NPCModel.modifyNPC(npc, attribute.modifiers)
    })

    // Run through item modifiers
    npc = NPCModel.modifyNPC(npc, item.modifiers)
    NPCModel.recalculateStats(npc)

    return npc
  }

  static unEquipItem(npc: NPCModel, item: ItemModel): NPCModel {
    // Attributes First
    // TODO: UNDO LOGIC NEEDS WORK - right now we just recalculate all the stats
    npc.gear[item.equipClass] = undefined
    // item.attributes.forEach(attribute => {
    //   npc = NPCModel.modifyNPC(npc, attribute.modifiers, true)
    // })

    // Run through item modifiers
    // npc = NPCModel.modifyNPC(npc, item.modifiers, true)
    NPCModel.recalculateStats(npc, false, true)

    return npc
  }

  static modifyNPC(npc: NPCModel, modifiers: Array<TargetModifier>, undo = false) {
    if (modifiers) {
      if (undo) {
        modifiers = modifiers.reverse()
      }
      modifiers.forEach(modifier => {
        if (modifier.targetType === TARGET_TYPE.NPC) {
          npc[modifier.targetKey] = TARGET_MODIFIER_RUNNER[modifier.targetChangeSymbol](npc[modifier.targetKey], modifier.targetChange, undo)
        }
      })
    }

    return npc
  }

  static calculateNPCCost(npc: NPCModel) {
    npc.cost = npc.calcCost

    return npc
  }

  static recalculateStats(npc: NPCModel, levelUp = false, itemUneqiped = false) {
    if (levelUp) {
      NPCModel.calculateNPCCost(npc)
    }

    if (itemUneqiped) {
      NPCModel.setStats(npc, npc.originalStats)
    }

    return npc
  }

  static recalculateDamage(npc: NPCModel) {
    npc.maxDamage = npc.calcMaxDamage
    npc.minDamage = npc.calcMinDamage

    return npc
  }

  static recalculateDodge(npc: NPCModel) {
    npc.evasion = npc.calcEvasion
    npc.accuracy = npc.calcAccuracy

    return npc
  }

  static recalculateHP(npc: NPCModel) {
    npc.maxHP = npc.calcMaxHP

    return npc
  }

  static recalculateNRG(npc: NPCModel) {
    npc.maxNRG = npc.calcMaxNRG

    return npc
  }

  static heal(npc: NPCModel, full = false, hp?: number) {
    if (full) {
      npc.nowHP = npc.maxHP
    } else {
      npc.nowHP += hp
    }

    return npc
  }

  static energize(npc: NPCModel, full = false, nrg?: number) {
    if (full) {
      npc.nowNRG = npc.nowNRG
    } else {
      npc.nowNRG += nrg
    }

    return npc
  }

  static addXP(npc: NPCModel, xp: number) {
    npc.nowXP += xp

    return npc
  }

  static levelUp(npc: NPCModel) {
    if (npc.nowXP >= npc.nextLevelXP) {
      npc.level += 1
      // Recalculate per level
      NPCModel.recalculateStats(npc, true)
      if (npc.nowXP >= npc.nextLevelXP) {
        NPCModel.levelUp(npc)
      } else {
        NPCModel.heal(npc, true)
        NPCModel.energize(npc, true)
      }
    }
  }

  static setStats(npc: NPCModel, stats: NPCModel | any) {
    npc.cost = stats.cost || (Math.floor((Math.random() * 100) + 300) / 1000) * 1000
    npc.maxHP = stats.maxHP || NPCBASESTATS.BASE.maxHP
    npc.nowHP = stats.nowHP || NPCBASESTATS.BASE.maxHP
    npc.maxNRG = stats.maxNRG || NPCBASESTATS.BASE.maxNRG
    npc.nowNRG = stats.nowNRG || NPCBASESTATS.BASE.maxNRG
    npc.nowXP = stats.nowXP || 0
    NPCModel.addXP(npc, npc.nowXP)

    npc.minDamage = stats.minDamage || Math.floor((Math.random() * 1) + 100)
    npc.maxDamage = stats.maxDamage || Math.floor((Math.random() * 50) + 100)

    npc.STR = stats.STR || (Math.floor((Math.random() * 10) + 30) / 1000) * 1000
    npc.DEX = stats.DEX || (Math.floor((Math.random() * 10) + 30) / 1000) * 1000
    npc.NRG = stats.NRG || (Math.floor((Math.random() * 10) + 30) / 1000) * 1000

    npc.criticalChance = .2
    npc.criticalDamage = (Math.floor((Math.random() * 100) + 10) / 1000)

    NPCModel.recalculateDodge(npc)

    npc.morale = stats.morale

    // Equip Items
    if (stats.gear) {
      Object.keys(stats.gear).forEach(slot => {
        NPCModel.equipItem(npc, stats.gear[slot])
      })
    }

    if (stats.trinkets && stats.trinkets.length > 0) {
      for (const trinket of stats.trinkets) {
        NPCModel.equipItem(npc, trinket)
      }
    }

    // Process attributes
    npc.attributes.forEach(attribute => {
      // Just in case you come back.. about attribute.modifiers
      // The attribute id might not exist if that error is hard to debug
      NPCModel.modifyNPC(npc, attribute.modifiers)
    })
    NPCModel.recalculateStats(npc)

    return npc
  }

  id: string
  name: string
  description: string
  icon?: string
  cost?: number

  isVillain?: boolean
  isAvailable?: boolean
  isInjured?: boolean

  injuredTimeLeft?: number

  baseStat: NPC_BASE_STAT
  level: number
  nowXP?: number

  maxHP?: number
  nowHP?: number
  maxNRG?: number
  nowNRG?: number
  morale?: number

  STR?: number
  DEX?: number
  NRG?: number

  minDamage?: number
  maxDamage?: number

  criticalChance?: number
  criticalDamage?: number

  evasion?: number
  accuracy?: number

  attributes?: Array<AttributeModel>

  gear: {
    [EQUIP_CLASS.Weapon]?: ItemModel
    [EQUIP_CLASS.Offhand]?: ItemModel
    [EQUIP_CLASS.Helm]?: ItemModel
    [EQUIP_CLASS.Chest]?: ItemModel
    [EQUIP_CLASS.Legs]?: ItemModel
  }
  trinkets?: Array<ItemModel>
  maxTrinkets?: number

  originalStats: any

  constructor(stats: any) {
    this.id = stats.id || uuid()
    this.name = stats.name || ''
    this.description = stats.description || ''
    this.isVillain = !!stats.isVillain
    this.isAvailable = stats.isAvailable !== false
    this.isInjured = !!stats.isInjured
    this.baseStat = stats.baseStat || NPC_BASE_STAT.STR
    this.level = stats.level || 1

    this.icon = stats.icon || '~/images/icons/unknown.png'

    // Initialize systems
    this.gear = {
      [EQUIP_CLASS.Weapon]: undefined,
      [EQUIP_CLASS.Offhand]: undefined,
      [EQUIP_CLASS.Helm]: undefined,
      [EQUIP_CLASS.Chest]: undefined,
      [EQUIP_CLASS.Legs]: undefined
    }
    this.attributes = stats.attributes || []
    this.maxTrinkets = stats.maxTrinkets || NPCBASESTATS.BASE.maxTrinkets

    this.originalStats = stats

    NPCModel.setStats(this, stats)
    NPCModel.heal(this, true)
    NPCModel.energize(this, true)
  }

  // TODO: ExpressionChangedAfterItHasBeenCheckedError
  // Cannot get these views to work properly
  get calcCost(): number {
    return this.cost
  }

  get nextLevelXP(): number {
    // Pokemon
    return Math.round((4 * (this.level ** 3)) / 5)
    // DnD v1
    // return 500 * (this.level ** 2) - (500 * this.level)
  }

  get calcEvasion() {
    return (Math.floor((Math.random() * 10) + 1) / 100) + (NPCBASESTATS[this.baseStat].dexMod * this.DEX + this.level) / 100
  }

  get calcAccuracy() {
    return (Math.floor((Math.random() * 100) + 90) / 100) + (NPCBASESTATS[this.baseStat].dexMod * this.DEX + this.level) /  100
  }

  get calcMaxNRG() {
    return Math.round(this.level * this.maxNRG
        + this.NRG * NPCBASESTATS[this.baseStat].nrgMod
        + NPCBASESTATS[this.baseStat].nrgMod)
  }

  get calcMaxHP() {
    return Math.round(this.level * this.maxHP
        + this.STR * NPCBASESTATS[this.baseStat].strMod
        + this.DEX * NPCBASESTATS[this.baseStat].dexMod
        + NPCBASESTATS[this.baseStat].dexMod * this.accuracy)
  }

  get calcMinDamage() {
    return Math.round(this.level * this.minDamage
      + (Math.floor((Math.random() * 10) + 1) / 10)
      + NPCBASESTATS[this.baseStat].strMod * this.STR
      + NPCBASESTATS[this.baseStat].dexMod * this.DEX
      + NPCBASESTATS[this.baseStat].nrgMod * this.NRG)
  }

  get calcMaxDamage() {
    return Math.round(this.level * this.maxDamage + 3
      + (Math.floor((Math.random() * 10) + 1) / 10)
      + NPCBASESTATS[this.baseStat].strMod * this.STR
      + NPCBASESTATS[this.baseStat].dexMod * this.DEX
      + NPCBASESTATS[this.baseStat].nrgMod * this.NRG)
  }

  get calcDamage() {
    return Math.floor((Math.random() * this.maxDamage) + this.minDamage)
  }

  get calcArmor() {
    return Math.round(this.level * .8
      + .5 * this.evasion
      + NPCBASESTATS[this.baseStat].strMod * this.STR
      + NPCBASESTATS[this.baseStat].dexMod * this.DEX)
  }
}

export enum NPC_BASE_STAT {
  STR = 'STR',
  DEX = 'DEX',
  NRG = 'NRG'
}

export enum NPC_SLOT {
  HELM,
  CHEST,
  PANTS,
  TRINKETS,
  RIGHTHAND,
  LEFTHAND
}

export const NPCBASESTATS = {
  BASE: {
    STR: 2,
    DEX: 2,
    NRG: 2,
    maxHP: 100,
    maxNRG: 5,
    morale: 100,
    maxTrinkets: 2
  },
  [NPC_BASE_STAT.STR]: {
    strMod: 2,
    dexMod: .8,
    nrgMod: .7
  },
  [NPC_BASE_STAT.DEX]: {
    strMod: .8,
    dexMod: 2,
    nrgMod: .8
  },
  [NPC_BASE_STAT.NRG]: {
    strMod: .7,
    dexMod: 2,
    nrgMod: 1.1
  }
}
