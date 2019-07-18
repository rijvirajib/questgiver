import { NPCModel } from '../models/npc.model'
import { ATTRIBUTES } from './attributes'

// These cannot be replaced
export const NPC: { [id: string]: NPCModel } = {
  SUPERMAN: {
    id: 'SUPERMAN',
    name: 'Superman',
    description: 'THE Superman',
    level: 10,
    BASE: {
      STR: 10,
      DEX: 10,
      INT: 10
    },
    INT: 10,
    STR: 10,
    DEX: 10,

    attributes: [
      ATTRIBUTES.INVULNERABLEKRYPTONITE.id,
    ]
  }
}
