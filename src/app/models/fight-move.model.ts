import { NPCModel } from './npc.model'
import { TargetModifier, TARGET_TYPE, TARGET_CHANGE_SYMBOL } from './target-modifier.model'
// import { v4 as uuid } from 'uuid'

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
  modifiers?: Array<TargetModifier>

  constructor(params: FightMove) {
    this.id = params.id // || uuid() // For some reason the uuid causes a crypto.Random issue
    this.name = params.name
    this.description = params.description || 'A basic attack.'
    this.levelRequirement = params.levelRequirement || 0
    this.nrgCost = params.nrgCost || 0
    this.initiativeCost = params.initiativeCost || 100

    this.minDamageDelta = params.minDamageDelta || 0
    this.maxDamageDelta = params.maxDamageDelta || 0
    this.isMultiplier = !!params.isMultiplier

    this.modifiers = params.modifiers || []
  }
}
