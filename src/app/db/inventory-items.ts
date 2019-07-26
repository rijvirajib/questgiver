import { ItemModel, ITEM_CLASS, EQUIP_CLASS } from '../models/item.model'
import { TARGET_TYPE, TARGET_CHANGE_SYMBOL } from '../models/target-modifier.model'
import { NPC_ATTRIBUTES, ITEM_ATTRIBUTES } from './attributes'
import { OBSTACLE_TYPE } from '../models/obstacle.model'

// These cannot be duplicated
export const INVENTORY_ITEMS: { [id: string]: ItemModel } = {
  HawkPersonAxe: new ItemModel({
    id: 'HawkPersonAxe',
    name: `HawkPerson's Nth Metal Axe`,
    description: `HawkPerson's legendary axe made of Nth metal. Strong against magic.`,
    class: ITEM_CLASS.Axe,
    equipClass: EQUIP_CLASS.Weapon,
    attributes: [ITEM_ATTRIBUTES.NTH],
    isAvailable: false,
    isSignature: true,
    modifiers: [{
      targetType: TARGET_TYPE.NPC,
      targetKey: 'STR',
      targetChange: 1.5,
      targetChangeSymbol: TARGET_CHANGE_SYMBOL['*']
    }, {
      targetType: TARGET_TYPE.NPC,
      targetKey: 'DEX',
      targetChange: 1.5,
      targetChangeSymbol: TARGET_CHANGE_SYMBOL['*']
    }]
  }),
  SwordOfPower: new ItemModel({
    id: 'SwordOfPower',
    name: `Sword of Power`,
    description: `Sword of Power makes the weilder stronger at the cost of energy.`,
    class: ITEM_CLASS.Axe,
    equipClass: EQUIP_CLASS.Weapon,
    attributes: [ITEM_ATTRIBUTES.NTH],
    modifiers: [{
      targetType: TARGET_TYPE.NPC,
      targetKey: 'STR',
      targetChange: 2,
      targetChangeSymbol: TARGET_CHANGE_SYMBOL['*']
    }, {
      targetType: TARGET_TYPE.NPC,
      targetKey: 'NRG',
      targetChange: .5,
      targetChangeSymbol: TARGET_CHANGE_SYMBOL['*']
    }]
  }),
  HelmofKnowledge: new ItemModel({
    id: 'HelmofKnowledge',
    name: `Helm of Knowledge`,
    description: `Slightly increases your energy.`,
    class: ITEM_CLASS.Helm,
    equipClass: EQUIP_CLASS.Helm,
    modifiers: [{
      targetType: TARGET_TYPE.NPC,
      targetKey: 'NRG',
      targetChange: 2,
      targetChangeSymbol: TARGET_CHANGE_SYMBOL['+']
    }]
  }),
  CCTV_SPLICE: new ItemModel({
    id: 'CCTV_SPLICE',
    name: 'CCTV Splice',
    description: 'Disables CCTVs up to level 1.',
    class: ITEM_CLASS.Consumable,
    equipClass: EQUIP_CLASS.Trinket,
    antiObstacles: [OBSTACLE_TYPE.CCTV]
  })
}
