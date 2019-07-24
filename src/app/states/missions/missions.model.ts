import { ItemModel } from '~/app/models/item.model'
import { MissionModel } from '~/app/models/mission.model'

export class MissionStateModel {
  missions: { [id: string]: MissionModel }
  missionIds: Array<string>
  inventory: { [id: string]: ItemModel }
  inventoryIds: Array<string>
}
