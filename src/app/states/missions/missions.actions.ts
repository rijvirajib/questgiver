import { MissionModel } from '../../models/mission.model'

export class LoadMissions {
  static readonly type = '[Mission] LoadMissions'
}
export class AddMission {
  static readonly type = '[Mission] Add Mission'
  constructor(public payload: { mission: MissionModel }) {}
}

export class AcceptMission {
  static readonly type = '[Mission] Accept Mission'
  constructor(public payload: { mission: MissionModel }) {}
}

export class CompleteMission {
  static readonly type = '[Mission] Complete Mission'
  constructor(public payload: { mission: MissionModel }) {}
}
