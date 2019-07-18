import { AttributeModel } from './attribute.model'
import { TargetModifier } from './target-modifier.model'
import { NPCModel } from './npc.model'

export class ObstacleModel {
  id: string
  name: string
  attributes: Array<AttributeModel>
  description: string
  value?: number // [0, 1]: 0 = DEFEATED
  isDefeated?: boolean // false

  requiredObstacles?: Array<ObstacleModel['id']>

  isNPC?: boolean
  npcId?: NPCModel['id']
  attributeId?: AttributeModel['id']

  // final checks when entering Quest.phase = 'COMBAT'
  results?: Array<Result>
}
class Result {
  threshold: number
  chance: number
  modifiers: Array<TargetModifier>
}

/* Example Obstacle:
[Environment] - Security Cameras
[results] A value of .2 will add 6 random goons total
* If value = 0, DISABLED
* If value > .4 +2 random goons at a chance of .5
* If value > .6 +2 random goons at a chance of .5
* If value > .8 +2 random goons at a chance of .5
* If value = 1 +2 random goons at a chance of .5
*/

export class EnvironmentObstacleModel extends ObstacleModel {

}

/* Example Obstacle:
[NPC] - Superman
[Attributes] - [Invulernable: Kryptonite, Fast, Strong, Laser Eyes]
A few things are good against Superman
* Item: [Kryptonite]
* Attribute: [Magic]
*/

export class NPCObstacleModel extends ObstacleModel {

}

// targetType[targetId].targetStat = targetType[targetId].targetStat {{targetChangeSymbol}} targetChange
