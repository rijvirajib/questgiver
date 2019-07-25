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
    isSignature: true,
    modifiers: [{
      targetType: TARGET_TYPE.NPC,
      targetKey: 'STR',
      targetChange: 1.2,
      targetChangeSymbol: TARGET_CHANGE_SYMBOL['*']
    }, {
      targetType: TARGET_TYPE.NPC,
      targetKey: 'DEX',
      targetChange: .9, // reduce dexterity by 1, heavier to swing, bro
      targetChangeSymbol: TARGET_CHANGE_SYMBOL['*']
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
