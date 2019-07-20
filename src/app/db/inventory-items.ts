import { ItemModel, ITEM_CLASS, EQUIP_CLASS } from '../models/item.model'
import { TARGET_TYPE, TARGET_CHANGE_SYMBOL } from '../models/target-modifier.model'
import { NPC_ATTRIBUTES } from './attributes'

// These cannot be duplicated
export const INVENTORY_ITEMS: { [id: string]: ItemModel } = {
  NTH_AXE: {
    id: 'NTH_AXE',
    name: 'Nth Axe',
    description: 'An axe made of Nth metal. Strong against magic.',
    class: [ITEM_CLASS.Axe],
    equipClass: EQUIP_CLASS.Trinket,
    attributes: [NPC_ATTRIBUTES.NTH.id],
    modifiers: {
      equip: [{
        targetType: TARGET_TYPE.NPC,
        targetKey: 'STR',
        targetChange: .1,
        targetChangeSymbol: TARGET_CHANGE_SYMBOL['*']
      }, {
        targetType: TARGET_TYPE.NPC,
        targetKey: 'DEX',
        targetChange: -.1, // reduce dexterity by 10%, heavier to swing, bro
        targetChangeSymbol: TARGET_CHANGE_SYMBOL['*']
      }]
    },
    quality: 1
  }
}
