import { EventModel, EVENT_TYPES } from '~/app/models/event.model'
import { ItemModel } from '~/app/models/item.model'
import { MissionModel } from '../../models/mission.model'
import { NPCModel } from '~/app/models/npc.model'

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

export class StartCasing {
  static readonly type = '[Mission] Start Casing'
  constructor(public mission: MissionModel) {}
}

export class CaseMissions {
  static readonly type = '[Mission] Case Missions'
}

export class DeployMission {
  static readonly type = '[Mission] Deploy Mission'
  constructor(public mission: MissionModel) {}
}

export class CombatMissions {
  static readonly type = '[Mission] Combat Missions'
}

export class EscapeMission {
  static readonly type = '[Mission] Escape Mission'
  constructor(public missionId: string) {}
}

export class LoseMission {
  static readonly type = '[Mission] Lose Mission'
  constructor(public missionId: string) {}
}

export class WinMission {
  static readonly type = '[Mission] Win Mission'
  constructor(public missionId: string) {}
}

export class CompleteMission {
  static readonly type = '[Mission] Complete Mission'
  constructor(public missionId: string) {}
}

export class HireCrew {
  static readonly type = '[Mission] Hire Crew'
  constructor(public mission: MissionModel, public npc: NPCModel) {}
}

export class EquipNPC {
  static readonly type = '[Mission] Equip NPC'
  constructor(public npcId: string, public itemId: string) {}
}

export class UnequipNPC {
  static readonly type = '[Mission] Unequip NPC'
  constructor(public npcId: string, public itemId: string) {}
}

export class FireCrew {
  static readonly type = '[Mission] Fire Crew'
  constructor(public mission: MissionModel, public npc: NPCModel) {}
}

export class NPCInitiativeGain {
  static readonly type = '[Mission] NPC Initiative Gain'
  constructor(public npcId: string) {}
}

export class AttackNPC {
  static readonly type = '[Mission] Attack NPC'
  constructor(public missionId: string, public npcId: string, public moveIndex: number, public targetNPCId?: string) {}
}

export class MissionLog {
  static readonly type = '[Mission] Log Entry'
  constructor(public missionId: string, public type: EVENT_TYPES, public message: string) {}
}
