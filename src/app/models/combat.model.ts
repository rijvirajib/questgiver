import { Dice } from 'dice-typescript'
import { EVENT_TYPES } from './event.model'
import { MissionModel } from './mission.model'
import { NPC_STATUS } from './npc.model'
import { ObstacleModel, OBSTACLE_TYPE } from './obstacle.model'
import { TargetModifier, TARGET_TYPE } from './target-modifier.model'

export class CombatModel {
  static startDeploy(mission: MissionModel) {
    mission = this.setInitiatives(mission)
    mission = this.processObstaclesDisable(mission)
    mission = this.processObstaclesActive(mission)

    return mission
  }

  // TODO: This is a TOTAL MESS :D
  // Disable Obstacles based on Trinkets and Attributes
  static processObstaclesDisable(mission: MissionModel) {
    let activeObstacles = 0
    const antiObstacles = Array<OBSTACLE_TYPE>()
    mission.obstacles.forEach((obstacle: ObstacleModel, o) => {
      if (antiObstacles.length > 0 && antiObstacles.includes(obstacle.type)) {
        mission = CombatModel.disableObstacle(mission, obstacle)
        mission.log.push({
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
            Object.keys(mission.crew).forEach((villainId) => {
              // Go through each Trinket
              mission.crew[villainId].trinkets.forEach(trinket => {
                if (trinket.id === target.targetId) {
                  mission = CombatModel.disableObstacle(mission, obstacle)
                  activeObstacles--

                  mission.log.push({
                    type: EVENT_TYPES.COMBAT,
                    time: -1,
                    message: `${trinket.name} disabled ${obstacle.name}`
                  })
                }
                // Since I am already at the Trinkets.. check their antiObstacles
                trinket.antiObstacles.forEach((obstacleType: OBSTACLE_TYPE) => {
                  antiObstacles.push(obstacleType)
                  if (obstacleType === obstacle.type) {
                    mission = CombatModel.disableObstacle(mission, obstacle)
                    activeObstacles--

                    mission.log.push({
                      type: EVENT_TYPES.COMBAT,
                      time: -1,
                      message: `${trinket.name} disabled ${obstacle.name}`
                    })
                  }
                })
              })

              // Go through each attribute
              mission.crew[villainId].attributes.forEach(attribute => {
                if (attribute.id === target.targetId) {
                  mission = CombatModel.disableObstacle(mission, obstacle)
                  activeObstacles--

                  mission.log.push({
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

    return mission
  }

  // TODO: Is this really pass by reference? Not sure
  // Grab the ID just in case it's not an ObstacleModel()
  static disableObstacle(mission: MissionModel, obstacle: ObstacleModel) {
    const index = mission.obstacles.findIndex(o => o.id === obstacle.id)
    // -1 should never be possible but why not
    if (index !== -1) {
      mission.obstacles[index].isDisabled = true
      // This is always an NPC ID now
      if (obstacle.type === OBSTACLE_TYPE.NPC && obstacle.npcId) {
        if (mission.heroes[obstacle.npcId]) {
          mission.heroes[obstacle.npcId].isRunAway = true
          mission.heroes[obstacle.npcId].status = NPC_STATUS.RUNAWAY

          mission.log.push({
            type: EVENT_TYPES.COMBAT,
            time: -1,
            message: `${mission.heroes[obstacle.npcId].name} ran away.`
          })
        }
      }
    }

    return mission
  }

  // Do bad stuff of obstacles not disabled
  static processObstaclesActive(mission: MissionModel) {
    return mission
  }

  // Set the initial initiative for everyone
  static setInitiatives(mission: MissionModel) {
    const dice = new Dice()
    const surpriseAttack = dice.roll('1d20').total

    Object.keys(mission.crew).forEach(npcId => {
      if (surpriseAttack >= 18) {
        mission.crew[npcId].initiative = 100
        mission.log.push({
          type: EVENT_TYPES.COMBAT,
          time: -1,
          message: `Surprise attack by ${mission.crew[npcId].name}!`
        })
      } else {
        mission.crew[npcId].initiative = Math.floor(dice.roll('1d20').total + mission.crew[npcId].speed)
        if (mission.crew[npcId].initiative > 100) {
          mission.crew[npcId].initiative = 100
        }
      }
    })

    Object.keys(mission.heroes).forEach(npcId => {
      if (surpriseAttack <= 1) {
        mission.heroes[npcId].initiative = 100
        mission.log.push({
          type: EVENT_TYPES.COMBAT,
          time: -1,
          message: `Surprise attack by enemy ${mission.heroes[npcId].name}!`
        })
      } else {
        mission.heroes[npcId].initiative = Math.floor(dice.roll('1d20').total + mission.heroes[npcId].speed)
        if (mission.heroes[npcId].initiative > 100) {
          mission.heroes[npcId].initiative = 100
        }
      }
    })

    return mission
  }
}
