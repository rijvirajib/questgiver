import { MissionModel } from '../../models/mission.model'

export class LoadMissions {
  static readonly type = '[Mission] LoadMissions'
}

export class AddMission {
  static readonly type = '[Mission] Add Mission'
  constructor(public mission: MissionModel) {}
}

export class RejectMission {
  static readonly type = '[Mission] Reject Mission'
  constructor(public mission: MissionModel) {}
}

export class AcceptMission {
  static readonly type = '[Mission] Accept Mission'
  constructor(public mission: MissionModel) {}
}

export class CaseMissions {
  static readonly type = '[Mission] Case Missions'
}

export class CompleteMission {
  static readonly type = '[Mission] Complete Mission'
  constructor(public mission: MissionModel) {}
}
