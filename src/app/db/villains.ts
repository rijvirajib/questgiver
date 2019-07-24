import { ATTRIBUTES, NPC_ATTRIBUTES } from './attributes'
import { EQUIP_CLASS } from '../models/item.model'
import { INVENTORY_ITEMS } from './inventory-items'
import { NPCModel, NPC_BASE_STAT } from '../models/npc.model'

export const VILLAINS: { [id: string]: NPCModel } = {
  Hawkperson: new NPCModel({
    id: 'Hawkperson',
    name: 'Hawkperson',
    description: 'Hawkperson carries a special Nth metal axe.',
    level: 1,
    baseStat: NPC_BASE_STAT.DEX,

    NRG: 10,
    STR: 10,
    DEX: 20,

    attributes: [
      NPC_ATTRIBUTES.Flying,
    ],
    gear: {
      [EQUIP_CLASS.Weapon]: INVENTORY_ITEMS.HawkPersonAxe
    }
  })
}
