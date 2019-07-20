import { AttributeModel } from './attribute.model'
import { TargetModifier } from './target-modifier.model'
import { OBSTACLE_TYPE } from './obstacle.model'

export class ItemModel {
  id: string
  name: string
  description: string
  cost?: number
  class: ITEM_CLASS
  equipClass: EQUIP_CLASS

  attributes?: Array<AttributeModel['id']>
  antiObstacles?: Array<OBSTACLE_TYPE>

  modifiers?: Array<TargetModifier>
  quality?: number // [0, 1]: 0 = destroyed

  // UX
  isVisible?: boolean
  isAvailabe?: boolean
}

export enum EQUIP_CLASS {
  Chest,
  Helm,
  Legs,
  Quest,
  Trinket,
  OH = 'One Hand',
  TH = 'Two Hand'
}

export enum ITEM_CLASS {
  Axe,
  Consumable, // Destroyed after use
  Dagger,
  Melee,
  Pistol,
  Radioactive,
  Rock,
  SMG,
  Shotgun,
  LS = 'Long Sword',
  SS = 'Short Sword'
}
