import { TargetModifier, TARGET_TYPE } from './target-modifier.model'
import { NPC_BASE_STAT } from './npc.model'
import { Weakness } from './weakness.model'

export class AttributeModel {
  id: string
  name: string
  class: ATTRIBUTE_CLASS
  baseStat?: NPC_BASE_STAT // Affiliated with what the base high stat will be
  description: string
  icon: string
  damageType?: ATTRIBUTE_CLASS.DAMAGE_TYPE

  rank?: number

  classConflicts?: Array<ATTRIBUTE_CLASS>
  conflicts?: Array<AttributeModel['id']>

  // If it's an item, usually

  modifiers?: Array<TargetModifier>

  canDisable?: boolean
  isDisabled?: boolean
  weaknesses?: {
    items?: Weakness
    attributes?: Weakness
  }

  toString() {
    return this.id
  }
}

export enum ATTRIBUTE_CLASS {
  'DAMAGE_TYPE', // Physical, Fire, Cold, Lightning, Poison, Arcane, Holy/Unholy
  'SKILL', //  Powers and Talents {Invulerable, Strength, Speed}
  'CHARACTER_CLASS' // Character base class
}
