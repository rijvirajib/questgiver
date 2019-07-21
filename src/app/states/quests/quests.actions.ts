import { QuestModel } from '../../models/quest.model'

export class LoadQuests {
  static readonly type = '[Quest] LoadQuests'
}
export class AddQuest {
  static readonly type = '[Quest] Add Quest'
  constructor(public payload: { quest: QuestModel }) {}
}

export class AcceptQuest {
  static readonly type = '[Quest] Accept Quest'
  constructor(public payload: { quest: QuestModel }) {}
}

export class CompleteQuest {
  static readonly type = '[Quest] Complete Quest'
  constructor(public payload: { quest: QuestModel }) {}
}
