import { NPCModel, NPC_BASE_STATS } from '../models/npc.model'
import { ATTRIBUTES } from './attributes'

// These cannot be replaced
export const NPC: { [id: string]: NPCModel } = {
  SUPERMAN: {
    id: 'SUPERMAN',
    name: 'Superman',
    description: 'Superman',
    level: 10,
    baseStat: NPC_BASE_STATS.STR,
    BASE: {
      STR: 10,
      DEX: 10,
      INT: 10
    },
    INT: 100,
    STR: 100,
    DEX: 100
  }
}
