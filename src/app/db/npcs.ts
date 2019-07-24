import { ATTRIBUTES, NPC_ATTRIBUTES } from './attributes'
import { EQUIP_CLASS } from '../models/item.model'
import { INVENTORY_ITEMS } from './inventory-items'
import { NPCModel, NPC_BASE_STAT } from '../models/npc.model'

// These cannot be replaced
export const NPC: { [id: string]: NPCModel } = {
  Hawkperson: new NPCModel({
    id: 'Hawkperson',
    name: 'Hawkperson',
    description: 'Hawkperson carries a special Nth metal axe.',
    isVillain: true,
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
  }),
  STORYNPC1: new NPCModel({
    id: 'STORYNPC1',
    name: 'Kwik Fix Magician',
    description: 'Just a simple magician working for the Kwik Fix store.',
    level: 1,
    baseStat: NPC_BASE_STAT.NRG,
    attributes: [
      NPC_ATTRIBUTES.MAGE, // just mage
    ]
  }),
  STORYNPC2: new NPCModel({
    id: 'STORYNPC2',
    name: 'Kwik Fix Chameleon',
    description: 'Can be anyone or anything. Hard to hit and can take a hard hit.',
    level: 1,
    baseStat: NPC_BASE_STAT.NRG,
    attributes: [
      NPC_ATTRIBUTES.CHAMELEON, // just a chameleon
    ]
  })
}
