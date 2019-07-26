import { AddMission, LoadMissions, AcceptMission, RejectMission, CaseMissions, HireCrew, FireCrew, EquipNPC } from './missions.actions'
import { CASEMESSAGES } from '~/app/db/case-messages'
import { EVENT_TYPES } from '~/app/models/event.model'
import { GameState } from '../game.state'
import { INVENTORY_ITEMS } from '~/app/db/inventory-items'
import { ITEM_ATTRIBUTES, NPC_ATTRIBUTES } from '~/app/db/attributes'
import { ImmutableContext, ImmutableSelector } from '@ngxs-labs/immer-adapter'
import { MissionModel, MISSION_STEP } from '~/app/models/mission.model'
import { MissionStateModel } from './missions.model'
import { NPC } from '~/app/db/npcs'
import { NPCModel } from '~/app/models/npc.model'
import { OBSTACLE_TYPE } from '~/app/models/obstacle.model'
import { STORYMISSIONS } from '~/app/db/story-missions'
import { State, Action, StateContext, Selector, Store, createSelector } from '@ngxs/store'
@State<MissionStateModel>({
  name: 'missions',
  defaults: {
    missions: {},
    missionIds: [],
    inventory: {},
    inventoryIds: [],
    npcs: {},
    npcIds: [],
    attributes: {},
    attributeIds: []
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
  static availableVillains(state: MissionStateModel): Array<NPCModel> {
    return Object.values(state.npcs).filter(x => x.isAvailable && x.isVillain)
  }

  @Selector()
  static availableMissions(state: MissionStateModel): Array<MissionModel> {
    return Object.values(state.missions).filter(x => x.isAvailable)
  }

  @Selector()
  static missionById(state: MissionStateModel) {
    return (id: string) => {
      return state.missions[id]
    }
  }

  @Selector()
  static crewByMissionId(state: MissionStateModel) {
    return (id: string) => {
      return Object.values(state.missions[id].crew).map(v => v)
    }
  }

  @Selector()
  static crewById(state: MissionStateModel) {
    return (missionId: string, npcId: string) => {
      return state.missions[missionId].crew[npcId]
    }
  }

  @Selector()
  static npcById(state: MissionStateModel) {
    return (id: string) => {
      return state.npcs[id]
    }
  }

  @Selector()
  static inventoryItems(state: MissionStateModel) {
    return (equipClass?: string) => {
      if (equipClass) {
        return Object.values(state.inventory).map(v => v).filter(v => v.equipClass === equipClass)
      }

      return Object.values(state.inventory).map(v => v)
    }
  }

  constructor(private store: Store) {}

  // Loads the story missions
  @Action(LoadMissions)
  @ImmutableContext()
  loadMissions({ setState }: StateContext<MissionStateModel>) {
    setState((state: MissionStateModel) => {

      if (state.inventoryIds.length === 0) {
        Object.keys(INVENTORY_ITEMS).forEach(key => {
          state.inventory[key] = INVENTORY_ITEMS[key]
          state.inventoryIds.push(key)
        })
      }

      if (state.attributeIds.length === 0) {
        Object.keys(ITEM_ATTRIBUTES).forEach(key => {
          state.attributes[key] = ITEM_ATTRIBUTES[key]
          state.attributeIds.push(key)
        })

        Object.keys(NPC_ATTRIBUTES).forEach(key => {
          state.attributes[key] = NPC_ATTRIBUTES[key]
          state.attributeIds.push(key)
        })
      }

      if (state.npcIds.length === 0) {
        Object.keys(NPC).forEach(key => {
          state.npcs[key] = NPC[key]
          state.npcIds.push(key)
        })
      }

      if (state.missionIds.length === 0) {
        state.missions = Object.assign({}, ...STORYMISSIONS.map(s => ({[s.id]: s})))
        state.missionIds = [STORYMISSIONS[0].id]
      }

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
  caseMissions(
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

  @Action(HireCrew)
  @ImmutableContext()
  hireCrew(
    { setState }: StateContext<MissionStateModel>,
    { mission, npc }: HireCrew
  ) {
    setState((state: MissionStateModel) => {
      state.npcs[npc.id].isAvailable = false

      // TODO: Handle Inventory

      // Attach NPC
      state.missions[mission.id].crew[npc.id] = state.npcs[npc.id]

      return state
    })
  }

  @Action(EquipNPC)
  @ImmutableContext()
  equipNPC(
    { setState, dispatch }: StateContext<MissionStateModel>,
    { mission, npc, item }: EquipNPC
  ) {
    setState((state: MissionStateModel) => {
      item.isAvailable = false
      state.inventory[item.id] = item

      // Attach Item
      state.missions[mission.id].crew[npc.id].onEquip(state.inventory[item.id])

      return state
    })
  }

  @Action(FireCrew)
  @ImmutableContext()
  fireCrew(
    { setState }: StateContext<MissionStateModel>,
    { mission, npc }: FireCrew
  ) {
    setState((state: MissionStateModel) => {
      state.npcs[npc.id].isAvailable = true

      // TODO: Handle Inventory

      // Remove NPC
      delete state.missions[mission.id].crew[npc.id]

      return state
    })
  }
}
