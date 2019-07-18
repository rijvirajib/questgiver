import { ItemModel, ITEM_CLASS, EQUIP_CLASS } from '../models/item.model'

// These cannot be duplicated
export const INVENTORY_ITEMS: { [id: string]: ItemModel } = {
  KRYPTONITE: {
    id: 'KRYPTONITE',
    name: 'Kryptonite',
    description: 'Radioactive rock that hurts some supers.',
    classes: [ITEM_CLASS.Rock, ITEM_CLASS.Radioactive],
    equipClass: EQUIP_CLASS.Trinket,
    quality: 1
  }
}
