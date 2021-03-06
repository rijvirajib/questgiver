import { NPCModel } from './npc.model'
import { TargetModifier, TARGET_TYPE, TARGET_CHANGE_SYMBOL } from './target-modifier.model'
import { guid } from '../utils/uuid'

export class FightMove {
  id?: string
  name: string
  description?: string
  levelRequirement?: number
  nrgCost?: number
  initiativeCost?: number

  minDamageDelta?: number
  maxDamageDelta?: number
  isMultiplier?: boolean

  // Can do ANYTHING!
  // TODO: Inflict Attributes and DOTs
  target?: FIGHTMOVE_TARGET
  modifiers?: Array<TargetModifier>

  constructor(params: FightMove) {
    this.id = params.id  || guid()
    this.name = params.name
    this.description = params.description || 'A basic attack.'
    this.levelRequirement = params.levelRequirement || 0
    this.nrgCost = params.nrgCost || 0
    this.initiativeCost = params.initiativeCost || 100

    this.minDamageDelta = params.minDamageDelta || 0
    this.maxDamageDelta = params.maxDamageDelta || 0
    this.isMultiplier = !!params.isMultiplier

    this.target = params.target || FIGHTMOVE_TARGET.ENEMY
    this.modifiers = params.modifiers || []
  }
}

export enum FIGHTMOVE_TARGET {
  ALL, // Could potentially damage allies (UNLESS YOU HAVE NONE, MWHAHAHAHA)
  SELF, // Heals
  ALLIES, // Global Heals
  ENEMY,
  ENEMIES,
}
