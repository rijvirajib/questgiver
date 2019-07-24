import { NPCModel, NPC_BASE_STAT } from '../models/npc.model'
import { ATTRIBUTES, NPC_ATTRIBUTES } from './attributes'
import { INVENTORY_ITEMS } from './inventory-items'

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
    rightHand: INVENTORY_ITEMS.HawkPersonAxe.id
  })
}
