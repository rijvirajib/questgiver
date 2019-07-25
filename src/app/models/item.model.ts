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
  isTwoHanded?: boolean

  attributes?: Array<AttributeModel>
  antiObstacles?: Array<OBSTACLE_TYPE>

  isSignature?: boolean
  modifiers?: Array<TargetModifier>
  quality?: number // [0, 1]: 0 = destroyed

  // UX
  isVisible?: boolean
  isAvailabe?: boolean
}

export enum EQUIP_CLASS {
  Weapon = 'weapon',
  Offhand = 'offhand',
  Helm = 'helm',
  Chest = 'chest',
  Legs = 'legs',
  Trinket = 'trinket',
  Mission = 'mission'
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
