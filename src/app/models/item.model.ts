import { AttributeModel } from './attribute.model'
import { TargetModifier } from './target-modifier.model'
import { OBSTACLE_TYPE } from './obstacle.model'
import { v4 as uuid } from 'uuid'

export interface IItemModel {
  id: string
  name: string
  description: string
  icon?: string
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
  isAvailable?: boolean
}
export class ItemModel implements IItemModel {
  id: string
  name: string
  description: string
  icon?: string
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
  isAvailable?: boolean

  constructor(params: IItemModel) {
    this.id = params.id || uuid()// string
    this.name = params.name || 'Random Item' // string
    this.description = params.description  || 'Random Description' // string
    this.icon = params.icon || '~/images/icons/unknown.png'
    this.cost = params.cost || 100 // number
    this.class = params.class || ITEM_CLASS.Rock // ITEM_CLASS
    this.equipClass = params.equipClass || EQUIP_CLASS.Trinket // EQUIP_CLASS
    this.isTwoHanded = !!params.isTwoHanded// boolean

    this.attributes = params.attributes || [] // Array<AttributeModel>
    this.antiObstacles = params.antiObstacles || [] // Array<OBSTACLE_TYPE>

    this.isSignature = !!params.isSignature // boolean
    this.modifiers = params.modifiers || [] // Array<TargetModifier>
    this.quality = params.quality || 1 // number // [0, 1]: 0 = destroyed

    // UX
    // That gets you a true value except when hasWheels is explicitly false.
    // (Other falsy values, including null and undefined, will result in true)
    this.isVisible = params.isVisible !== false // boolean
    this.isAvailable = params.isAvailable !== false // boolean
  }
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
  Consumable,
  Dagger,
  Helm,
  Melee,
  Pistol,
  Radioactive,
  Rock,
  SMG,
  Shotgun,
  LS = 'Long Sword',
  SS = 'Short Sword'
}
