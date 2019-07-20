import { AttributeModel } from './attribute.model'
import { TargetModifier } from './target-modifier.model'
import { NPCModel } from './npc.model'

export class ObstacleModel {
  id: string
  name: string
  attributes: Array<AttributeModel>
  description: string
  isDisabled?: boolean // false

  requiredObstacles?: Array<ObstacleModel['id']>

  isNPC?: boolean
  npcId?: NPCModel['id']

  weaknesses?: {

  }

  // check for score  to generate effects 'COMBAT'
  score?: number
  results?: {
    [threshold: number]: Result
  }
}
class Result {
  chance: number
  modifiers: Array<TargetModifier>
}

/* Example Obstacle:
[Environment] - Security Cameras
[results] A score of .2 will add 6 random NPC total
* If score = 0, DISABLED
* If score > .4 +2 random NPC at a chance of .5
* If score > .6 +2 random NPC at a chance of .5
* If score > .8 +2 random NPC at a chance of .5
* If score = 1 +2 random NPC at a chance of .5
*/

export class EnvironmentObstacleModel extends ObstacleModel {

}

export class NPCObstacleModel extends ObstacleModel {

}

// targetType[targetId].targetStat = targetType[targetId].targetStat {{targetChangeSymbol}} targetChange
