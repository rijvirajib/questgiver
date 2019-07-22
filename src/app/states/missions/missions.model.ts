import { MissionModel } from '~/app/models/mission.model'

export class MissionStateModel {
  missions: { [id: string]: MissionModel }
  missionIds: Array<string>
}
