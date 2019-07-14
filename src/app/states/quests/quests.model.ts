import { QuestModel } from '~/app/models/quest.model'

export class QuestStateModel {
  quests: { [key: string]: QuestModel }
  questIds: Array<string>
}
