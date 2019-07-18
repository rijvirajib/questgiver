import { AttributeModel } from './attribute.model'
import { ItemModel } from './item.model'

export class NPCModel {
  id: string
  name: string
  description: string

  BASE: {
    STR: number
    DEX: number
    INT: number
  }

  STR: number
  DEX: number
  INT: number

  damage?: number
  criticalChance?: number
  criticalDamage?: number
  chanceToHit?: number

  chanceToDodge?: number
  armor?: number

  morale?: number

  attributes?: Array<AttributeModel['id']>

  isTwoHandsUsed?: boolean
  rightHand?: ItemModel['id']
  leftHand?: ItemModel['id']

  helm?: ItemModel['id']
  chest?: ItemModel['id']
  pants?: ItemModel['id']
  trinkets?: Array<ItemModel['id']>

}
