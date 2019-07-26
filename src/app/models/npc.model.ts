import { AttributeModel } from './attribute.model'
import { ItemModel, EQUIP_CLASS } from './item.model'
import { TARGET_TYPE, TargetModifier, TARGET_MODIFIER_RUNNER } from './target-modifier.model'
import { v4 as uuid } from 'uuid'

export class NPCModel {
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

  constructor(stats: any) {
    this.id = stats.id || uuid()
    this.name = stats.name || ''
    this.description = stats.description || ''
    this.cost = stats.cost || (Math.floor((Math.random() * 100) + 300) / 1000) * 1000
    this.isVillain = !!stats.isVillain
    this.isAvailable = stats.isAvailable !== false
    this.isInjured = !!stats.isInjured
    this.baseStat = stats.baseStat || NPC_BASE_STAT.STR
    this.level = stats.level || 1
    this.maxHP = stats.maxHP || NPCBASESTATS.BASE.maxHP
    this.nowHP = stats.nowHP || NPCBASESTATS.BASE.maxHP
    this.maxNRG = stats.maxNRG || NPCBASESTATS.BASE.maxNRG
    this.nowNRG = stats.nowNRG || NPCBASESTATS.BASE.maxNRG
    this.addXP(stats.nowXP || 0)
    this.icon = stats.icon || '~/images/icons/unknown.png'

    this.minDamage = stats.minDamage || Math.floor((Math.random() * 1) + 100)
    this.maxDamage = stats.maxDamage || Math.floor((Math.random() * 50) + 100)

    // Initialize gear system
    this.gear = {
      [EQUIP_CLASS.Weapon]: undefined,
      [EQUIP_CLASS.Offhand]: undefined,
      [EQUIP_CLASS.Helm]: undefined,
      [EQUIP_CLASS.Chest]: undefined,
      [EQUIP_CLASS.Legs]: undefined
    }

    this.attributes = stats.attributes || []

    this.STR = stats.STR || (Math.floor((Math.random() * 10) + 30) / 1000) * 1000
    this.DEX = stats.DEX || (Math.floor((Math.random() * 10) + 30) / 1000) * 1000
    this.NRG = stats.NRG || (Math.floor((Math.random() * 10) + 30) / 1000) * 1000

    this.maxTrinkets = stats.maxTrinkets || NPCBASESTATS.BASE.maxTrinkets

    this.criticalChance = .2
    this.criticalDamage = (Math.floor((Math.random() * 100) + 10) / 1000)

    this.recalculateDodge()

    this.morale = stats.morale

    // Equip Items
    if (stats.gear) {
      Object.keys(stats.gear).forEach(slot => {
        this.onEquip(stats.gear[slot])
      })
    }

    if (stats.trinkets && stats.trinkets.length > 0) {
      for (const trinket of stats.trinkets) {
        this.onEquip(trinket)
      }
    }

    // Process attributes
    this.attributes.forEach(attribute => {
      // Just in case you come back.. about attribute.modifiers
      // The attribute id might not exist if that error is hard to debug
      this.runNPCModifier(attribute.modifiers)
    })
    this.recalculateStats()
    this.heal(true)
    this.nrgize(true)
  }

  recalculateStats(levelUp = false) {
    if (levelUp) {
      this.recalculateCost()
    }
    this.recalculateDamage()
    this.recalculateDodge()
    this.recalculateHP()
    this.recalculateNRG()
  }

  recalculateCost() {
    this.cost = this.calcCost
  }

  recalculateDamage() {
    this.maxDamage = this.calcMaxDamage
    this.minDamage = this.calcMinDamage
  }

  recalculateDodge() {
    this.evasion = this.calcEvasion
    this.accuracy = this.calcAccuracy
  }

  recalculateHP() {
    this.maxHP = this.calcMaxHP
  }

  recalculateNRG() {
    this.maxNRG = this.calcMaxNRG
  }

  onEquip(item: ItemModel) {
    // Attributes First
    this.gear[item.equipClass] = item
    item.attributes.forEach(attribute => {
      this.runNPCModifier(attribute.modifiers)
    })

    // Run through item modifiers
    this.runNPCModifier(item.modifiers)
  }

  equipItem = (item: ItemModel): void => {
    this.gear[item.equipClass] = item
    item.attributes.forEach(attribute => {
      this.runNPCModifier(attribute.modifiers)
    })

    // Run through item modifiers
    this.runNPCModifier(item.modifiers)
  }

  heal(full = false, hp?: number) {
    if (full) {
      this.nowHP = this.maxHP
    } else {
      this.nowHP += hp
    }
  }

  nrgize(full = false, nrg?: number) {
    if (full) {
      this.nowNRG = this.nowNRG
    } else {
      this.nowNRG += nrg
    }
  }

  addXP(xp: number) {
    this.nowXP += xp
  }

  levelUp() {
    if (this.nowXP >= this.nextLevelXP) {
      this.level += 1
      // Recalculate per level
      this.recalculateStats(true)
      if (this.nowXP >= this.nextLevelXP) {
        this.levelUp()
      } else {
        this.heal(true)
        this.nrgize(true)
      }
    }
  }

  runNPCModifier(modifiers: Array<TargetModifier>) {
    if (modifiers) {
      modifiers.forEach(modifier => {
        if (modifier.targetType === TARGET_TYPE.NPC) {
          this[modifier.targetKey] = TARGET_MODIFIER_RUNNER[modifier.targetChangeSymbol](this[modifier.targetKey], modifier.targetChange)
        }
      })
    }
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
    strMod: 1.2,
    dexMod: .8,
    nrgMod: .7
  },
  [NPC_BASE_STAT.DEX]: {
    strMod: .8,
    dexMod: 1.2,
    nrgMod: .8
  },
  [NPC_BASE_STAT.NRG]: {
    strMod: .7,
    dexMod: .8,
    nrgMod: 1.1
  }
}
