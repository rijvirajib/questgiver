import { AddQuest, LoadQuests } from './quests.actions'
import { QuestModel } from '~/app/models/quest.model'
import { QuestStateModel } from './quests.model'
import { STORYQUESTS } from '~/app/db/story-quests'
import { State, Action, StateContext, Selector } from '@ngxs/store'

@State<QuestStateModel>({
  name: 'quests',
  defaults: {
    quests: {},
    questIds: []
  }
})

export class QuestsState {
  @Selector()
  static allQuestIds(state: QuestStateModel) {
    return state.questIds
  }

  @Selector()
  static allQuests(state: QuestStateModel) {
    return state.quests
  }

  @Selector()
  static availableQuests(state: QuestStateModel): Array<QuestModel> {
    return Object.keys(state.quests).map(id => {
      if (state.quests[id].isAvailable && state.quests[id].isAvailable === true) {
        return state.quests[id]
      }
    })
  }

  // Loads the story quests
  @Action(LoadQuests)
  loadQuests({ getState, patchState, dispatch }: StateContext<QuestStateModel>) {
    const state = getState()
    state.quests = Object.assign({}, ...STORYQUESTS.map(s => ({[s.id]: s})))
    state.questIds = [STORYQUESTS[0].id]
    patchState({
      quests: state.quests,
      questIds: state.questIds
    })
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
