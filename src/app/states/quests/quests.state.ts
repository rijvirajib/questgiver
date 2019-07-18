import { State, Action, StateContext, Selector } from '@ngxs/store'
import { QuestStateModel } from './quests.model'
import { AddQuest } from './quests.actions'

@State<QuestStateModel>({
  name: 'quests',
  defaults: {
    quests: {},
    questIds: []
  }
})

export class QuestsState {
  @Selector()
  static allQuests(state: QuestStateModel) {
    return state.quests
  }

  @Action(AddQuest)
  addQuest(
    { getState, patchState, dispatch }: StateContext<QuestStateModel>,
    { payload }: AddQuest
  ) {
    const state = getState()
    patchState({
      quests: { ...state.quests, [payload.quest.id]: payload.quest },
      questIds: [...state.questIds, payload.quest.id]
    })
  }
}
