import { NPCModel } from '../models/npc.model'
import { ATTRIBUTES } from './attributes'

export const NPC: { [id: string]: NPCModel } = {
  SUPERMAN: {
    id: 'SUPERMAN',
    name: 'Superman',
    description: 'THE Superman',
    BASE_STR: 10,
    BASE_DEX: 10,
    BASE_INT: 10,
    attributes: [
      ATTRIBUTES.INVULNERABLEKRYPTONITE.id,
    ]
  }
}
