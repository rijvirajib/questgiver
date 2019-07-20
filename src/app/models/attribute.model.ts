import { TargetModifier, TARGET_TYPE } from './target-modifier.model'
import { ItemModel } from './item.model'
import { NPC_BASE_STATS } from './npc.model'
import { Weakness } from './weaktness.model'

export class AttributeModel {
  id: string
  name: string
  class: ATTRIBUTE_CLASS
  baseStat: NPC_BASE_STATS
  description: string
  damageType?: ATTRIBUTE_CLASS.DAMAGE_TYPE

  rank?: number
  isDisabled?: boolean

  classConflicts?: Array<ATTRIBUTE_CLASS>
  conflicts?: Array<AttributeModel['id']>

  // If it's an item, usually

  modifiers?: Array<TargetModifier>

  // Usually only used with NPCs
  weaknesses?: {
    items?: Weakness
    attributes?: Weakness
  }
}

export enum ATTRIBUTE_CLASS {
  'DAMAGE_TYPE', // Physical, Fire, Cold, Lightning, Poison, Arcane, Holy/Unholy
  'SKILL', //  Powers and Talents {Invulerable, Strength, Speed}
  'CHARACTER_CLASS' // Character base class
}
