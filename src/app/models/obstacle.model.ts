import { AttributeModel } from './attribute.model'
import { NPCModel } from './npc.model'
import { TargetModifier } from './target-modifier.model'
import { v4 as uuid } from 'uuid'

export class ObstacleModel {
  id: string
  name: string
  description: string
  icon?: string
  isHidden?: boolean // false
  caseTime: number // DEFAULT: 1
  casedTime: number
  isCased?: boolean
  isDisabled?: boolean // false

  requiredObstacles?: Array<ObstacleModel['id']>

  type: OBSTACLE_TYPE
  npcId?: NPCModel['id']

  attributes?: Array<AttributeModel>
  weaknesses?: Array<TargetModifier>

  // check for score  to generate effects 'COMBAT'
  score?: number
  results?: {
    [threshold: number]: Result
  }

  constructor(params) {
    this.id = params.id || uuid()
    this.name = params.name || 'Generic name'
    this.description = params.description || 'Generic Obstacle Description'
    this.icon  = params.icon || '~/images/icons/unknown.png'
    this.isHidden  = !!params.isHidden

    this.caseTime = params.caseTime
    this.casedTime = params.casedTime

    this.isCased  = !!params.isCased
    this.isDisabled  = !!params.isDisabled

    this.requiredObstacles  = params.requiredObstacles || []

    this.type = params.type || OBSTACLE_TYPE.UNKNOWN
    this.npcId  = params.npcId

    this.attributes  = params.attributes || []
    this.weaknesses  = params.weaknesses || []

    // check for score  to generate effects 'COMBAT'
    this.score  = params.score || 100
    this.results = params.results || {}
  }
}

export enum OBSTACLE_TYPE {
  UNKNOWN = 'Unknown',
  CCTV = 'CCTV',
  NPC = 'Hero',
  KEYPAD = 'Keypad'
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
