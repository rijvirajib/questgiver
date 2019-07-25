import { AttributeModel } from './attribute.model'
import { ItemModel, EQUIP_CLASS } from './item.model'
import { TARGET_TYPE, TargetModifier, TARGET_MODIFIER_RUNNER } from './target-modifier.model'
import { v4 as uuid } from 'uuid'

export class NPCModel {
  id: string
  name: string
  description: string
  icon?: string
  _cost?: number

  isVillain?: boolean
  isAvailable?: boolean

  isInjured?: boolean
  injuredTimeLeft?: boolean

  baseStat: NPC_BASE_STAT
  level: number
  nowXP?: number

  nowHP?: number
  nowNRG?: number
  morale?: number

  STR?: number
  DEX?: number
  NRG?: number

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
    this._cost = stats.cost || (Math.floor((Math.random() * 100) + 300) / 1000) * 1000
    this.isVillain = stats.isVillain || false
    this.isAvailable = stats.isAvailable || true
    this.isInjured = stats.isInjured || false
    this.baseStat = stats.baseStat || NPC_BASE_STAT.STR
    this.level = stats.level || 1
    this.nowHP = stats.nowHP || this.maxHP
    this.nowNRG = stats.nowNRG || this.nowNRG
    this.addXP(stats.nowXP || 0)
    this.icon = stats.icon || '~/images/icons/unknown-obstacle.png'

    // Initialize gear system
    this.gear = {
      [EQUIP_CLASS.Weapon]: undefined,
      [EQUIP_CLASS.Offhand]: undefined,
      [EQUIP_CLASS.Helm]: undefined,
      [EQUIP_CLASS.Chest]: undefined,
      [EQUIP_CLASS.Legs]: undefined
    }

    this.attributes = this.attributes || []

    this.STR = stats.STR
    this.DEX = stats.DEX
    this.NRG = stats.NRG

    this.maxTrinkets = stats.maxTrinkets || NPCBASESTATS.BASE.maxTrinkets

    this.criticalChance = .2
    this.criticalDamage = (Math.floor((Math.random() * 100) + 10) / 1000)

    this.recalculateStats()

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
    for (const attribute of this.attributes) {
      this.runNPCModifier(attribute.modifiers)
    }
  }

  recalculateStats() {
    this._cost = Math.round(this._cost + (this.level * (this.level + 1)) / 2)
    this.evasion =
      (Math.floor((Math.random() * 10) + 1) / 100) + (NPCBASESTATS[this.baseStat].dexMod * this.DEX + this.level) / 100
    this.accuracy =
      (Math.floor((Math.random() * 100) + 90) / 100) + (NPCBASESTATS[this.baseStat].dexMod * this.DEX + this.level) /  100
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

  addXP(xp: number) {
    this.nowXP += xp
  }

  levelUp() {
    if (this.nowXP >= this.nextLevelXP) {
      this.level += 1
      // TODO: Increase Base Stats
      if (this.nowXP > this.nextLevelXP) {
        this.levelUp()
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

  get cost(): number {
    return this._cost
  }

  get nextLevelXP(): number {
    // Pokemon
    return Math.round((4 * (this.level ** 3)) / 5)
    // DnD v1
    // return 500 * (this.level ** 2) - (500 * this.level)
  }

  get maxHP() {
    return this.level * NPCBASESTATS.BASE.maxHP
        + this.STR * NPCBASESTATS[this.baseStat].strMod
        + this.DEX * NPCBASESTATS[this.baseStat].dexMod
        + NPCBASESTATS[this.baseStat].dexMod * this.accuracy
  }

  get maxNRG() {
    return this.level * NPCBASESTATS.BASE.maxNRG
        + this.NRG * NPCBASESTATS[this.baseStat].nrgMod
        + NPCBASESTATS[this.baseStat].nrgMod
  }

  get armor() {
    return this.level * .8
    + this.DEX * NPCBASESTATS[this.baseStat].dexMod
    + this.NRG * NPCBASESTATS[this.baseStat].nrgMod
    + this.STR * NPCBASESTATS[this.baseStat].strMod
    + .5 * this.evasion
  }
  get minDamage() {
    return this.level * NPCBASESTATS.BASE.minDamage
    + NPCBASESTATS[this.baseStat].strMod * this.STR
    + NPCBASESTATS[this.baseStat].dexMod * this.DEX
    + NPCBASESTATS[this.baseStat].nrgMod * this.NRG
  }

  get maxDamage() {
    return this.level * NPCBASESTATS.BASE.maxDamage
    + NPCBASESTATS[this.baseStat].strMod * this.STR
    + NPCBASESTATS[this.baseStat].dexMod * this.DEX
    + NPCBASESTATS[this.baseStat].nrgMod * this.NRG
  }

  // get damage() {
  //   return Math.floor((Math.random() * this.maxDamage) + this.minDamage)
  // }
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
    maxHP: 5,
    maxNRG: 5,
    maxDamage: 2,
    minDamage: 2,
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
