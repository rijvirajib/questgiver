import { TargetModifier, TARGET_TYPE } from './target-modifier.model'
import { ItemModel } from './item.model'

export class AttributeModel {
  id: string
  name: string
  class: ATTRIBUTE_CLASS
  description: string

  rank: number
  isDisabled?: boolean

  classConflicts?: Array<ATTRIBUTE_CLASS>
  conflicts?: Array<AttributeModel['id']>
  weaknesses?: Array<Weakness>

  modifiers?: Array<TargetModifier>
}

export class Weakness {
  items?: Array<ItemModel['id']>
  attributes?: Array<AttributeModel['id']>
  modifiers: Array<TargetModifier>
}

export enum ATTRIBUTE_CLASS {
  'Invulnerable',
  'Speed',
  'Strength',
  'Fire',
  'Water',
  'Power',
  'Class'
}
