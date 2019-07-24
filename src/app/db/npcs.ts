import { NPCModel, NPC_BASE_STAT } from '../models/npc.model'
import { ATTRIBUTES } from './attributes'

// These cannot be replaced
export const NPC: { [id: string]: NPCModel } = {
  SUPERMAN: new NPCModel({
    id: 'SUPERMAN',
    name: 'Superman',
    description: 'Superman',
    level: 10,
    baseStat: NPC_BASE_STAT.STR,
    STR: 10,
    DEX: 10,
    NRG: 10
  })
}
