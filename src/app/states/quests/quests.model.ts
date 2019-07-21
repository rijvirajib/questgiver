import { QuestModel } from '~/app/models/quest.model'

export class QuestStateModel {
  quests: { [id: string]: QuestModel }
  questIds: Array<string>
}
