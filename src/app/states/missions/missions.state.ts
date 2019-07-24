import { AddMission, LoadMissions, AcceptMission, RejectMission, CaseMissions } from './missions.actions'
import { CASEMESSAGES } from '~/app/db/case-messages'
import { EventModel, EVENT_TYPES } from '~/app/models/event.model'
import { GameState } from '../game.state'
import { ImmutableContext, ImmutableSelector } from '@ngxs-labs/immer-adapter'
import { MissionModel, MISSION_STEP } from '~/app/models/mission.model'
import { MissionStateModel } from './missions.model'
import { OBSTACLE_TYPE } from '~/app/models/obstacle.model'
import { STORYMISSIONS } from '~/app/db/story-missions'
import { State, Action, StateContext, Selector, Store } from '@ngxs/store'
@State<MissionStateModel>({
  name: 'missions',
  defaults: {
    missions: {},
    missionIds: [],
    inventory: {},
    inventoryIds: []
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
      state.missions[mission.id].times.rejected = this.store.selectSnapshot(GameState.currentTime)
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
      state.missions[mission.id].times.accepted = currentTime
      state.missions[mission.id].totalCaseTime = totalCaseTime

      // Initialize the log
      state.missions[mission.id].log = []
      state.missions[mission.id].log.push({
        type: EVENT_TYPES.MISSION,
        time: currentTime,
        message: `Mission ${mission.id} has been accepted.`
      })

      return state
    })
  }

  @Action(CaseMissions)
  @ImmutableContext()
  CaseMissions(
    { setState }: StateContext<MissionStateModel>
  ) {
    setState((state: MissionStateModel) => {
      for (const key of Object.keys(state.missions)) {
        if (state.missions[key].step === MISSION_STEP.Intel) {
          // Go through ONE obstacle and increment time spent
          let isComplete = true
          // tslint:disable-next-line:prefer-for-of
          for (let obstacleIndex = 0; obstacleIndex < state.missions[key].obstacles.length; obstacleIndex++) {
            const obstacle = state.missions[key].obstacles[obstacleIndex]

            // Already cased, go to the next obstacle
            if (state.missions[key].obstacles[obstacleIndex].isCased) {
              continue
            }
            isComplete = false
            let message: string
            // First second of casing the obstacle
            if (obstacle.casedTime === 0) {
              // Message is different if hidden
              message = CASEMESSAGES[obstacle.type].case[1]
              if (obstacle.isHidden) {
                message = CASEMESSAGES[OBSTACLE_TYPE.UNKNOWN].case[0]
              }
            }
            // Provide a message during casing at a random interval
            const timeRatio = obstacle.casedTime / obstacle.caseTime
            // We 1/4th ratios
            if ((timeRatio >= .5 && timeRatio <= .51) || (timeRatio >= .2 && timeRatio <= .21) || (timeRatio >= .8 && timeRatio <= .81)) {
              message = CASEMESSAGES[obstacle.type].casing[Math.floor(Math.random() * CASEMESSAGES[obstacle.type].casing.length)]
              if (obstacle.isHidden && timeRatio >= .8) {
                message = CASEMESSAGES[OBSTACLE_TYPE.UNKNOWN].casingClose(obstacle.type)
              }
            }

            if (obstacle.casedTime >= obstacle.caseTime) {
              // This obstacle is now 'cased'
              state.missions[key].obstacles[obstacleIndex].isHidden = false
              state.missions[key].obstacles[obstacleIndex].isCased = true
              message = CASEMESSAGES[obstacle.type].cased[Math.floor(Math.random() * CASEMESSAGES[obstacle.type].cased.length)]
            } else {
              state.missions[key].obstacles[obstacleIndex].casedTime += 1
              state.missions[key].totalCasedTime += 1
            }
            // Only do one at a time
            if (message) {
              state.missions[key].log.push({
                type: EVENT_TYPES.INTEL,
                time: this.store.selectSnapshot(GameState.currentTime),
                message
              })
            }
            break
          }

          // If the mission is ready
          if (isComplete) {
            state.missions[key].times.cased = this.store.selectSnapshot(GameState.currentTime)
            state.missions[key].step = MISSION_STEP.Ready
            break
          }
        }
      }

      return state
    })
  }
}
