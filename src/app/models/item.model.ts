import { AttributeModel } from './attribute.model'
import { TargetModifier } from './target-modifier.model'

export class ItemModel {
  id: string
  name: string
  description: string
  classes: Array<ITEM_CLASS>
  equipClass: EQUIP_CLASS

  attributes?: Array<AttributeModel>
  modifiers?: {
    equip?: Array<TargetModifier>
    use?: Array<TargetModifier>
    drop?: Array<TargetModifier>
  }
  quality?: number // [0, 1]: 0 = destroyed
  isActive?: boolean
}

export enum EQUIP_CLASS {
  Helm,
  Chest,
  Legs,
  Trinket,
  Quest,
  OH = 'One Hand',
  TH = 'Two Hand'
}

export enum ITEM_CLASS {
  Dagger,
  Pistol,
  Shotgun,
  SMG,
  Melee,
  Rock,
  Radioactive,
  SS = 'Short Sword',
  LS = 'Long Sword'
}
