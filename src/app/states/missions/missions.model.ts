import { ItemModel } from '~/app/models/item.model'
import { MissionModel } from '~/app/models/mission.model'
import { NPCModel } from '~/app/models/npc.model'

export class MissionStateModel {
  missions: { [id: string]: MissionModel }
  missionIds: Array<string>
  inventory: { [id: string]: ItemModel }
  inventoryIds: Array<string>
  npcs: { [id: string]: NPCModel }
  npcIds: Array<string>
}
