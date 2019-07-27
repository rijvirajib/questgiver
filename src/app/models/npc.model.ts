import { AttributeModel } from './attribute.model'
import { ItemModel, EQUIP_CLASS } from './item.model'
import { TARGET_TYPE, TargetModifier, TARGET_MODIFIER_RUNNER } from './target-modifier.model'
import { v4 as uuid } from 'uuid'

export class NPCModel {

  static equipItem(npc: NPCModel, item: ItemModel): NPCModel {
    // Attributes First
    if (item.equipClass === EQUIP_CLASS.Trinket) {
      // Already maxed out
      if (npc.trinkets.length >= npc.maxTrinkets) {
        return npc
      }
      npc.trinkets.push(item)
    } else {
      npc.gear[item.equipClass] = item
    }
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
    if (item.equipClass === EQUIP_CLASS.Trinket) {
      const index: number = npc.trinkets.findIndex(x => x.id === item.id)
      if (index !== -1) {
        npc.trinkets.splice(index, 1)
      }
    } else {
      npc.gear[item.equipClass] = undefined
    }

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
    npc.cost = NPCModel.calcCost(npc)

    return npc
  }

  static recalculateStats(npc: NPCModel, levelUp = false, itemUneqiped = false) {
    if (levelUp) {
      NPCModel.calculateNPCCost(npc)
    }

    if (itemUneqiped) {
      NPCModel.setStats(npc, npc.originalStats)
    }

    // Although implicit reference, just in case
    npc = NPCModel.recalculateDamage(npc)
    npc = NPCModel.recalculateDodge(npc)
    npc = NPCModel.recalculateHP(npc)
    npc = NPCModel.recalculateNRG(npc)

    return npc
  }

  static recalculateDamage(npc: NPCModel) {
    npc.maxDamage = NPCModel.calcMaxDamage(npc)
    npc.minDamage = NPCModel.calcMinDamage(npc)

    return npc
  }

  static recalculateDodge(npc: NPCModel) {
    npc.evasion = NPCModel.calcEvasion(npc)
    npc.accuracy = NPCModel.calcAccuracy(npc)

    return npc
  }

  static recalculateHP(npc: NPCModel) {
    npc.maxHP = NPCModel.calcMaxHP(npc)

    return npc
  }

  static recalculateNRG(npc: NPCModel) {
    npc.maxNRG = NPCModel.calcMaxNRG(npc)

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
    if (npc.nowXP >= NPCModel.nextLevelXP(npc)) {
      npc.level += 1
      // Recalculate per level
      NPCModel.recalculateStats(npc, true)
      if (npc.nowXP >= NPCModel.nextLevelXP(npc)) {
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

  static calcCost(npc: NPCModel): number {
    return npc.cost
  }

  static nextLevelXP(npc: NPCModel): number {
    // Pokemon
    return Math.round((4 * (npc.level ** 3)) / 5)
    // DnD v1
    // return 500 * (npc.level ** 2) - (500 * npc.level)
  }

  static calcEvasion(npc: NPCModel) {
    return (Math.floor((Math.random() * 10) + 1) / 100) + (NPCBASESTATS[npc.baseStat].dexMod * npc.DEX + npc.level) / 100
  }

  static calcAccuracy(npc: NPCModel) {
    return (Math.floor((Math.random() * 100) + 90) / 100) + (NPCBASESTATS[npc.baseStat].dexMod * npc.DEX + npc.level) /  100
  }

  static calcMaxNRG(npc: NPCModel) {
    return Math.round(npc.level * npc.maxNRG
        + npc.NRG * NPCBASESTATS[npc.baseStat].nrgMod
        + NPCBASESTATS[npc.baseStat].nrgMod)
  }

  static calcMaxHP(npc: NPCModel) {
    return Math.round(npc.level * npc.maxHP
        + npc.STR * NPCBASESTATS[npc.baseStat].strMod
        + npc.DEX * NPCBASESTATS[npc.baseStat].dexMod
        + NPCBASESTATS[npc.baseStat].dexMod * npc.accuracy)
  }

  static calcMinDamage(npc: NPCModel) {
    return Math.round(npc.level * npc.minDamage
      + (Math.floor((Math.random() * 10) + 1) / 10)
      + NPCBASESTATS[npc.baseStat].strMod * npc.STR
      + NPCBASESTATS[npc.baseStat].dexMod * npc.DEX
      + NPCBASESTATS[npc.baseStat].nrgMod * npc.NRG)
  }

  static calcMaxDamage(npc: NPCModel) {
    return Math.round(npc.level * npc.maxDamage + 3
      + (Math.floor((Math.random() * 10) + 1) / 10)
      + NPCBASESTATS[npc.baseStat].strMod * npc.STR
      + NPCBASESTATS[npc.baseStat].dexMod * npc.DEX
      + NPCBASESTATS[npc.baseStat].nrgMod * npc.NRG)
  }

  static calcDamage(npc: NPCModel) {
    return Math.floor((Math.random() * npc.maxDamage) + npc.minDamage)
  }

  static calcArmor(npc: NPCModel) {
    return Math.round(npc.level * .8
      + .5 * npc.evasion
      + NPCBASESTATS[npc.baseStat].strMod * npc.STR
      + NPCBASESTATS[npc.baseStat].dexMod * npc.DEX)
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
    this.trinkets = stats.trinkets || []
    this.maxTrinkets = stats.maxTrinkets || NPCBASESTATS.BASE.maxTrinkets

    this.originalStats = stats

    NPCModel.setStats(this, stats)
    NPCModel.heal(this, true)
    NPCModel.energize(this, true)
  }

  // TODO: ExpressionChangedAfterItHasBeenCheckedError
  // Cannot static these npc: NPCModelviews to work properly
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
