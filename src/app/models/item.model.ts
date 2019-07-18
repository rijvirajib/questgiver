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
  isUsed?: boolean
}

export enum EQUIP_CLASS {
  'One Hand',
  'Two Hand',
  'Helm',
  'Chest',
  'Legs',
  'Trinket',
  'Quest'
}

export enum ITEM_CLASS {
  'Dagger',
  'Sword',
  'Broad Sword',
  'Pistol',
  'Shotgun',
  'Melee',
  'Rock',
  Radioactive // [0, 1]: 0 = destroyed
}
