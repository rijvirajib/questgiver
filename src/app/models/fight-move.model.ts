import { NPCModel } from './npc.model'
import { TargetModifier, TARGET_TYPE, TARGET_CHANGE_SYMBOL } from './target-modifier.model'
// import { v4 as uuid } from 'uuid'

export class FightMove {
  id?: string
  name: string
  description?: string
  levelRequirement?: number
  nrgCost?: number

  minDamageDelta?: number
  maxDamageDelta?: number

  // Can do ANYTHING!
  modifiers?: Array<TargetModifier>

  constructor(params: any) {
    this.id = params.id // || uuid() // For some reason the uuid causes a crypto.Random issue
    this.name = params.name || 'Basic'
    this.description = params.description || 'A basic attack.'
    this.levelRequirement = params.levelRequirement || 0
    this.nrgCost = params.nrgCost || 0

    this.minDamageDelta = params.minDamageDelta || 0
    this.maxDamageDelta = params.maxDamageDelta || 0

    this.modifiers = params.modifiers || []
  }
}
