import {
  AddMission,
  LoadMissions,
  AcceptMission,
  RejectMission,
  CaseMissions,
  HireCrew,
  FireCrew,
  EquipNPC,
  UnequipNPC,
  StartCasing,
  DeployMission,
  CombatMissions,
} from './missions.actions'
import { CASEMESSAGES } from '~/app/db/case-messages'
import { CombatModel } from '~/app/models/combat.model'
import { EVENT_TYPES } from '~/app/models/event.model'
import { GameState } from '../game.state'
import { INVENTORY_ITEMS } from '~/app/db/inventory-items'
import { ITEM_ATTRIBUTES, NPC_ATTRIBUTES } from '~/app/db/attributes'
import { ImmutableContext, ImmutableSelector } from '@ngxs-labs/immer-adapter'
import { MissionModel, MISSION_STEP } from '~/app/models/mission.model'
import { MissionStateModel } from './missions.model'
import { NPC } from '~/app/db/npcs'
import { NPCModel, NPC_STATUS } from '~/app/models/npc.model'
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
    return (missionId: string) => {
      const crew = []
      state.missions[missionId].crewIds.forEach(npcId => {
        crew.push(state.npcs[npcId])
      })

      return crew
    }
  }

  @Selector()
  static npcByIds(state: MissionStateModel) {
    return (ids: Array<string>) => {
      const npcs = []
      ids.forEach(id => {
        npcs.push(state.npcs[id])
      })

      return npcs
    }
  }

  @Selector()
  static inventoryItems(state: MissionStateModel) {
    return (equipClass?: string) => {
      if (equipClass) {
        return Object.values(state.inventory).map(v => v).filter(v => {
          if (v.isAvailable && v.equipClass === equipClass) {
            return v
          }
        })
      }

      return Object.values(state.inventory).map(v => {
        if (v.isAvailable) {
          return v
        }
      })
    }
  }

  constructor(private store: Store) {}

  // Loads the story missions
  @Action(LoadMissions)
  @ImmutableContext()
  loadMissions({ setState, dispatch }: StateContext<MissionStateModel>) {
    setState((state: MissionStateModel) => {

      // Something broke when loading from database
      if (!state.inventoryIds || !state.npcIds) {
        state.missions = {}
        state.missionIds = []
        state.inventory = {}
        state.inventoryIds = []
        state.npcs = {}
        state.npcIds = []
        state.attributes = {}
        state.attributeIds = []
      }

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
        Object.keys(NPC).forEach(npcId => {
          state.npcs[npcId] = NPC[npcId]
          state.npcIds.push(npcId)

          if (NPC[npcId].gear) {
            Object.keys(NPC[npcId].gear).forEach(slot => {
              if (NPC[npcId].gear[slot]) {
                dispatch(new EquipNPC(npcId, NPC[npcId].gear[slot]))
              }
            })
          }

          if (NPC[npcId].trinkets && NPC[npcId].trinkets.length > 0) {
            for (const trinketId of NPC[npcId].trinkets) {
              dispatch(new EquipNPC(npcId, trinketId))
            }
          }
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

      state.missions[mission.id].step = MISSION_STEP.Accepted
      state.missions[mission.id].times.accepted = currentTime

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

  @Action(StartCasing)
  @ImmutableContext()
  startCasing(
    { setState }: StateContext<MissionStateModel>,
    { mission }: StartCasing
  ) {
    setState((state: MissionStateModel) => {
      const currentTime = this.store.selectSnapshot(GameState.currentTime)
      let totalCaseTime = 0
      state.missions[mission.id].obstacles.forEach(obstacle => {
        totalCaseTime += obstacle.caseTime
      })
      state.missions[mission.id].step = MISSION_STEP.Intel
      state.missions[mission.id].times.casing = currentTime
      state.missions[mission.id].totalCaseTime = totalCaseTime

      // Initialize the log
      state.missions[mission.id].log = []
      state.missions[mission.id].log.push({
        type: EVENT_TYPES.MISSION,
        time: currentTime,
        message: `Mission ${mission.id} is being cased.`
      })

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
      state.npcs[npc.id].status = NPC_STATUS.ACTIVE
      // Attach NPC
      state.missions[mission.id].crewIds.push(npc.id)

      return state
    })
  }

  @Action(EquipNPC)
  @ImmutableContext()
  equipNPC(
    { setState }: StateContext<MissionStateModel>,
    { npcId, itemId }: EquipNPC
  ) {
    setState((state: MissionStateModel) => {
      // Attach Item to NPC state
      state = NPCModel.equipItem(state, npcId, itemId)

      return state
    })
  }

  @Action(UnequipNPC)
  @ImmutableContext()
  unequipNPC(
    { setState }: StateContext<MissionStateModel>,
    { npcId, itemId }: UnequipNPC
  ) {
    setState((state: MissionStateModel) => {
      state.inventory[itemId].isAvailable = true

      // Attach Item
      state = NPCModel.unEquipItem(state, npcId, itemId)

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
      state.npcs[npc.id].status = NPC_STATUS.INACTIVE

      // Remove NPC
      state.missions[mission.id].crewIds = state.missions[mission.id].crewIds.filter(npcId => npcId !== npc.id)

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
        if (state.missions[key].times.casing && !state.missions[key].times.cased) {
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
            const currentTime = this.store.selectSnapshot(GameState.currentTime)
            state.missions[key].times.cased = currentTime
            state.missions[key].step = MISSION_STEP.Ready
            state.missions[key].log.push({
              type: EVENT_TYPES.MISSION,
              time: currentTime,
              message: `Mission ${key} has been cased.`
            })
            break
          }
        }
      }

      return state
    })
  }

  @Action(DeployMission)
  @ImmutableContext()
  DeployMission(
    { setState }: StateContext<MissionStateModel>,
    { mission }: DeployMission
  ) {
    setState((state: MissionStateModel) => {
      const currentTime = this.store.selectSnapshot(GameState.currentTime)
      // Update Hero NPCs
      state.missions[mission.id].obstacles.forEach(obstacle => {
        if (obstacle.type === OBSTACLE_TYPE.NPC) {
          state.npcs[obstacle.npcId].isAvailable = false
          state.npcs[obstacle.npcId].status = NPC_STATUS.DEPLOY
          state.npcs[obstacle.npcId].morale = 100

          state.missions[mission.id].heroIds.push(obstacle.npcId)
        }
      })

      state.missions[mission.id].times.deployed = currentTime
      state = CombatModel.startDeploy(state, mission.id)
      state.missions[mission.id].step = MISSION_STEP.Deploy
      state.missions[mission.id].log.push({
        type: EVENT_TYPES.MISSION,
        time: currentTime,
        message: `Mission ${mission.id} has been deployed.`
      })

      return state
    })
  }

  // Runs onTick
  @Action(CombatMissions)
  @ImmutableContext()
  combatMissions(
    { setState }: StateContext<MissionStateModel>
  ) {
    setState((state: MissionStateModel) => {
      for (const missionId of Object.keys(state.missions)) {
        if (state.missions[missionId].step === MISSION_STEP.Deploy) {
          // Check NPC stats if there is a winner
          let isAHeroAlive = false
          state.missions[missionId].heroIds.forEach(npcId => {
            const activeNPC = state.npcs[npcId]
            if (activeNPC.nowHP > 0 && !activeNPC.isInjured && !activeNPC.isRunAway) {
              isAHeroAlive = true
              state.npcs[npcId].status = NPC_STATUS.COMBAT
            }
          })
          if (!isAHeroAlive) {
            state.missions[missionId].log.push({
              type: EVENT_TYPES.COMBAT,
              time: this.store.selectSnapshot(GameState.currentTime),
              message: `[WIN] All enemy Heroes are gone.`
            })
            state.missions[missionId].step = MISSION_STEP.Escape

            return state
          }

          let isACrewAlive = false
          state.missions[missionId].crewIds.forEach(npcId => {
            const activeNPC = state.npcs[npcId]
            if (activeNPC.nowHP > 0 && !activeNPC.isInjured && !activeNPC.isRunAway) {
              isACrewAlive = true
              state.npcs[npcId].status = NPC_STATUS.COMBAT
            }
          })
          if (!isACrewAlive) {
            state.missions[missionId].log.push({
              type: EVENT_TYPES.COMBAT,
              time: this.store.selectSnapshot(GameState.currentTime),
              message: `[LOSE] All crew Villains are gone.`
            })
            state.missions[missionId].step = MISSION_STEP.Escape

            return state
          }
          // Go through Iniatitives
          state.missions[missionId].heroIds.forEach(id => {
            const activeNPC = state.npcs[id]
            if (activeNPC.nowHP > 0 && activeNPC.initiative >= 100) {
              // Do combat to a single active enemy NPC
              const currentTime = this.store.selectSnapshot(GameState.currentTime)
              const targetNPC = state.npcs[this.getRandomTarget(state.missions[missionId].crewIds)]
              const hitChance = ((activeNPC.accuracy - targetNPC.evasion) / activeNPC.accuracy) * 100
              if (hitChance <= 0 || (Math.floor(Math.random() * (100 - 0)) + 0) > hitChance) {
                state.missions[missionId].log.push({
                  type: EVENT_TYPES.COMBAT,
                  time: currentTime,
                  message: `[HERO]${activeNPC.name} MISSED ${targetNPC.name} with hitChance ${hitChance}`
                })
              } else {
                const atk = NPCModel.calcDamage(activeNPC)
                const def = NPCModel.calcArmor(targetNPC)
                const damage = atk - def
                state.npcs[targetNPC.id].nowHP -= damage
                state.missions[missionId].log.push({
                  type: EVENT_TYPES.COMBAT,
                  time: currentTime,
                  message: `[HERO] ${activeNPC.name} HIT ${targetNPC.name} for ${damage} damage, atk ${atk}, def: ${def}.`
                })
                if (state.npcs[targetNPC.id].nowHP <= 0) {
                  state.npcs[targetNPC.id].isInjured = true
                  state.npcs[targetNPC.id].status = NPC_STATUS.INJURED
                  state.missions[missionId].log.push({
                    type: EVENT_TYPES.COMBAT,
                    time: currentTime,
                    message: `[HERO] ${activeNPC.name} KILLED ${targetNPC.name}.`
                  })
                }
              }
              state.npcs[id].initiative -= 100
            } else {
              state.npcs[id].initiative += state.npcs[id].speed
            }
          })

          // Update Crew NPCs
          state.missions[missionId].crewIds.forEach(id => {
            const activeNPC = state.npcs[id]
            if (activeNPC.nowHP > 0 && activeNPC.initiative >= 100) {
              // Do combat to a single active enemy NPC
              const currentTime = this.store.selectSnapshot(GameState.currentTime)
              const targetNPC = state.npcs[this.getRandomTarget(state.missions[missionId].heroIds)]
              const hitChance = Math.floor(((activeNPC.accuracy - targetNPC.evasion) / activeNPC.accuracy) * 100)
              if (hitChance <= 0 || (Math.floor(Math.random() * (100 - 0)) + 0) > hitChance) {
                state.missions[missionId].log.push({
                  type: EVENT_TYPES.COMBAT,
                  time: currentTime,
                  message: `[CREW]${activeNPC.name} MISSED hitting ${targetNPC.name} with hitChance ${hitChance}`
                })
              } else {
                const atk = NPCModel.calcDamage(activeNPC)
                const def = NPCModel.calcArmor(targetNPC)
                const damage = atk - def
                state.npcs[targetNPC.id].nowHP -= damage

                state.missions[missionId].log.push({
                  type: EVENT_TYPES.COMBAT,
                  time: currentTime,
                  message: `[CREW]${activeNPC.name} HIT ${targetNPC.name} for ${damage} damage, atk ${atk}, def: ${def}.`
                })

                if (state.npcs[targetNPC.id].nowHP <= 0) {
                  state.npcs[targetNPC.id].isInjured = true
                  state.npcs[targetNPC.id].status = NPC_STATUS.INJURED
                  state.missions[missionId].log.push({
                    type: EVENT_TYPES.COMBAT,
                    time: currentTime,
                    message: `[CREW] ${activeNPC.name} KILLED ${targetNPC.name}.`
                  })
                }
              }
              state.npcs[id].initiative = 0
            } else {
              state.npcs[id].initiative += state.npcs[id].speed
            }
          })
        }
      }

      return state
    })
  }

  getRandomTarget(npcs: Array<string>) {
    return npcs[Math.floor(Math.random() * npcs.length)]
  }
}
