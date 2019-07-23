import { AddMission, LoadMissions, AcceptMission, RejectMission, CaseMissions } from './missions.actions'
import { GameState } from '../game.state'
import { MissionModel, MISSION_STEP } from '~/app/models/mission.model'
import { MissionStateModel } from './missions.model'
import { STORYMISSIONS } from '~/app/db/story-missions'
import { State, Action, StateContext, Selector, Store } from '@ngxs/store'
import { ImmutableContext, ImmutableSelector } from '@ngxs-labs/immer-adapter'
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

  constructor(private store: Store) {}

  // Loads the story missions
  @Action(LoadMissions)
  @ImmutableContext()
  loadMissions({ setState }: StateContext<MissionStateModel>) {
    setState((state: MissionStateModel) => {
      state.missions = Object.assign({}, ...STORYMISSIONS.map(s => ({[s.id]: s})))
      state.missionIds = [STORYMISSIONS[0].id]

      return state
    })
  }

  @Action(AddMission)
  @ImmutableContext()
  addMission(
    { setState }: StateContext<MissionStateModel>,
    { mission }: AddMission
  ) {
    setState((state: MissionStateModel) => {
      state.missions[mission.id] = mission

      return state
    })
  }

  @Action(RejectMission)
  @ImmutableContext()
  rejectMission(
    { setState }: StateContext<MissionStateModel>,
    { mission }: RejectMission
  ) {
    setState((state: MissionStateModel) => {
      state.missions[mission.id].rejectedTime = this.store.selectSnapshot(GameState.currentTime)
      // state.missions[mission.id].isVisible = false

      return state
    })
  }

  @Action(AcceptMission)
  @ImmutableContext()
  acceptMission(
    { setState }: StateContext<MissionStateModel>,
    { mission }: AcceptMission
  ) {
    setState((state: MissionStateModel) => {
      const currentTime = this.store.selectSnapshot(GameState.currentTime)
      let totalCaseTime = 0
      state.missions[mission.id].obstacles.forEach(obstacle => {
        totalCaseTime += obstacle.caseTime
      })
      state.missions[mission.id].step = MISSION_STEP.Intel
      state.missions[mission.id].acceptedTime = currentTime
      state.missions[mission.id].totalCaseTime = totalCaseTime

      return state
    })
  }

  @Action(CaseMissions)
  @ImmutableContext()
  CaseMissions(
    { setState }: StateContext<MissionStateModel>
  ) {
    setState((state: MissionStateModel) => {
      let totalCasedTime = 0
      Object.keys(state.missions).forEach(key => {
        if (state.missions[key].step === MISSION_STEP.Intel) {
          state.missions[key].totalCasedTime += 1
          state.missions[key].obstacles.forEach((obstacle, i) => {
            state.missions[key].obstacles[i].casedTime += 1
            totalCasedTime += obstacle.casedTime

            if (obstacle.casedTime === obstacle.caseTime) {
              state.missions[key].obstacles[i].isHidden = false
              state.missions[key].obstacles[i].casedTime = this.store.selectSnapshot(GameState.currentTime)
            }
          })
          if (state.missions[key].totalCaseTime === state.missions[key].totalCasedTime) {
            state.missions[key].casedTime = this.store.selectSnapshot(GameState.currentTime)
            state.missions[key].step = MISSION_STEP.Ready
          }
        }
      })

      return state
    })
  }
}
