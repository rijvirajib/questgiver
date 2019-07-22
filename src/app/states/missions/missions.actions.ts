import { MissionModel } from '../../models/quest.model'

export class LoadMissions {
  static readonly type = '[Mission] LoadMissions'
}
export class AddMission {
  static readonly type = '[Mission] Add Mission'
  constructor(public payload: { quest: MissionModel }) {}
}

export class AcceptMission {
  static readonly type = '[Mission] Accept Mission'
  constructor(public payload: { quest: MissionModel }) {}
}

export class CompleteMission {
  static readonly type = '[Mission] Complete Mission'
  constructor(public payload: { quest: MissionModel }) {}
}
