import { ItemModel, ITEM_CLASS, EQUIP_CLASS } from '../models/item.model'
import { TARGET_TYPE, TARGET_CHANGE_SYMBOL } from '../models/target-modifier.model'
import { NPC_ATTRIBUTES } from './attributes'
import { OBSTACLE_TYPE } from '../models/obstacle.model'

// These cannot be duplicated
export const INVENTORY_ITEMS: { [id: string]: ItemModel } = {
  NTH_AXE: {
    id: 'NTH_AXE',
    name: 'Nth Axe',
    description: 'An axe made of Nth metal. Strong against magic.',
    class: ITEM_CLASS.Axe,
    equipClass: EQUIP_CLASS.OH,
    attributes: [NPC_ATTRIBUTES.NTH.id],
    modifiers: [{
      targetType: TARGET_TYPE.NPC,
      targetKey: 'STR',
      targetChange: .2,
      targetChangeSymbol: TARGET_CHANGE_SYMBOL['*']
    }, {
      targetType: TARGET_TYPE.NPC,
      targetKey: 'DEX',
      targetChange: -.05, // reduce dexterity by 5%, heavier to swing, bro
      targetChangeSymbol: TARGET_CHANGE_SYMBOL['*']
    }],
    quality: 1
  },
  CCTV_SPLICE: {
    id: 'CCTV_SPLICE',
    name: 'CCTV Splice',
    description: 'Disables CCTVs up to level 1.',
    class: ITEM_CLASS.Consumable,
    equipClass: EQUIP_CLASS.Trinket,
    antiObstacles: [OBSTACLE_TYPE.CCTV],
    quality: 1
  }
}
