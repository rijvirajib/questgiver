import { Dice } from 'dice-typescript'
import { EVENT_TYPES } from './event.model'
import { MissionModel } from './mission.model'
import { MissionStateModel } from '../states/missions/missions.model'
import { NPC_STATUS } from './npc.model'
import { ObstacleModel, OBSTACLE_TYPE } from './obstacle.model'
import { TargetModifier, TARGET_TYPE } from './target-modifier.model'

export class CombatModel {
  static startDeploy(state: MissionStateModel, missionId: string) {
    state = this.setInitiatives(state, missionId)
    state = this.processObstaclesDisable(state, missionId)
    state = this.processObstaclesActive(state, missionId)

    return state
  }

  // TODO: This is a TOTAL MESS :D
  // Disable Obstacles based on Trinkets and Attributes
  static processObstaclesDisable(state: MissionStateModel, missionId: string) {
    let activeObstacles = 0
    const antiObstacles = Array<OBSTACLE_TYPE>()
    state.missions[missionId].obstacles.forEach((obstacle: ObstacleModel, o) => {
      if (antiObstacles.length > 0 && antiObstacles.includes(obstacle.type)) {
        state = CombatModel.disableObstacle(state, missionId, obstacle.id)
        state.missions[missionId].log.push({
          type: EVENT_TYPES.COMBAT,
          time: -1,
          message: `${obstacle.name} has been disabled.`
        })
      }
      activeObstacles++

      obstacle.weaknesses.forEach((target: TargetModifier, t) => {
        // Check Trinkets for disables
        switch (target.targetType) {
          case TARGET_TYPE.ITEM:
          case TARGET_TYPE.ATTRIBUTE: {
            // Go through each NPC
            state.missions[missionId].crewIds.forEach((villainId) => {
              // Go through each Trinket
              state.npcs[villainId].trinkets.forEach(trinketId => {
                if (trinketId === target.targetId) {
                  state = CombatModel.disableObstacle(state, missionId, obstacle.id)
                  activeObstacles--

                  state.missions[missionId].log.push({
                    type: EVENT_TYPES.COMBAT,
                    time: -1,
                    message: `${state.inventory[trinketId].name} disabled ${obstacle.name}`
                  })
                }
                // Since I am already at the Trinkets.. check their antiObstacles
                state.inventory[trinketId].antiObstacles.forEach((obstacleType: OBSTACLE_TYPE) => {
                  antiObstacles.push(obstacleType)
                  if (obstacleType === obstacle.type) {
                    state = CombatModel.disableObstacle(state, missionId, obstacle.id)
                    activeObstacles--

                    state.missions[missionId].log.push({
                      type: EVENT_TYPES.COMBAT,
                      time: -1,
                      message: `${state.inventory[trinketId].name} disabled ${obstacle.name}`
                    })
                  }
                })
              })

              // Go through each attribute
              state.npcs[villainId].attributes.forEach(attribute => {
                if (attribute.id === target.targetId) {
                  state = CombatModel.disableObstacle(state, missionId, obstacle.id)
                  activeObstacles--

                  state.missions[missionId].log.push({
                    type: EVENT_TYPES.COMBAT,
                    time: -1,
                    message: `${attribute.name} disabled ${obstacle.name}`
                  })
                }
              })
            })
            break
          }

          default: {
            // statements;
            break
          }
        }
      })
    })

    if (!activeObstacles) {
      // Do obstacle negatives for active obstacles
    }

    return state
  }

  static disableObstacle(state: MissionStateModel, missionId: string, obstacleId: string) {
    const index = state.missions[missionId].obstacles.findIndex(o => o.id === obstacleId)
    // -1 should never be possible but why not
    if (index !== -1) {
      state.missions[missionId].obstacles[index].isDisabled = true
      // This is always an NPC ID now
      const obstacle = state.missions[missionId].obstacles[index]
      if (obstacle.type === OBSTACLE_TYPE.NPC && obstacle.npcId) {
        if (state.npcs[obstacle.npcId]) {
          state.npcs[obstacle.npcId].isRunAway = true
          state.npcs[obstacle.npcId].status = NPC_STATUS.RUNAWAY

          state.missions[missionId].log.push({
            type: EVENT_TYPES.COMBAT,
            time: -1,
            message: `${state.npcs[obstacle.npcId].name} ran away.`
          })
        }
      }
    }

    return state
  }

  // Do bad stuff of obstacles not disabled
  static processObstaclesActive(state: MissionStateModel, missionId: string) {
    return state
  }

  // Set the initial initiative for everyone
  static setInitiatives(state: MissionStateModel, missionId: string) {
    const dice = new Dice()
    const surpriseAttack = dice.roll('1d20').total

    state.missions[missionId].crewIds.forEach(npcId => {
      if (surpriseAttack >= 18) {
        state.npcs[npcId].initiative = 100
        state.missions[missionId].log.push({
          type: EVENT_TYPES.COMBAT,
          time: -1,
          message: `Surprise attack by ${state.npcs[npcId].name}!`
        })
      } else {
        state.npcs[npcId].initiative = Math.floor(dice.roll('1d20').total + state.npcs[npcId].speed)
        if (state.npcs[npcId].initiative > 100) {
          state.npcs[npcId].initiative = 100
        }
      }
    })

    state.missions[missionId].heroIds.forEach(npcId => {
      if (surpriseAttack <= 1) {
        state.npcs[npcId].initiative = 100
        state.missions[missionId].log.push({
          type: EVENT_TYPES.COMBAT,
          time: -1,
          message: `Surprise attack by enemy ${state.npcs[npcId].name}!`
        })
      } else {
        state.npcs[npcId].initiative = Math.floor(dice.roll('1d20').total + state.npcs[npcId].speed)
        if (state.npcs[npcId].initiative > 100) {
          state.npcs[npcId].initiative = 100
        }
      }
    })

    return state
  }
}
