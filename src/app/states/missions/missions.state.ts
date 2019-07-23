import { AddMission, LoadMissions } from './missions.actions'
import { MissionModel } from '~/app/models/mission.model'
import { MissionStateModel } from './missions.model'
import { STORYMISSIONS } from '~/app/db/story-missions'
import { State, Action, StateContext, Selector, createSelector } from '@ngxs/store'

@State<MissionStateModel>({
  name: 'missions',
  defaults: {
    missions: {},
    missionIds: []
  }
})

export class MissionsState {
  @Selector()
  static allMissionIds(state: MissionStateModel) {
    return state.missionIds
  }

  @Selector()
  static allMissions(state: MissionStateModel) {
    return state.missions
  }

  @Selector()
  static availableMissions(state: MissionStateModel): Array<MissionModel> {
    return Object.keys(state.missions).map(id => {
      if (state.missions[id].isAvailable && state.missions[id].isAvailable === true) {
        return state.missions[id]
      }
    })
  }

  @Selector()
  static missionById(state: MissionStateModel) {
    return (id: string) => {
      return state.missions[id]
    }
  }

  // Loads the story missions
  @Action(LoadMissions)
  loadMissions({ getState, patchState, dispatch }: StateContext<MissionStateModel>) {
    const state = getState()
    state.missions = Object.assign({}, ...STORYMISSIONS.map(s => ({[s.id]: s})))
    state.missionIds = [STORYMISSIONS[0].id]
    patchState({
      missions: state.missions,
      missionIds: state.missionIds
    })
  }

  @Action(AddMission)
  addMission(
    { getState, patchState, dispatch }: StateContext<MissionStateModel>,
    { payload }: AddMission
  ) {
    const state = getState()
    patchState({
      missions: { ...state.missions, [payload.mission.id]: payload.mission },
      missionIds: [...state.missionIds, payload.mission.id]
    })
  }
}
