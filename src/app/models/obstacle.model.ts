import { AttributeModel } from './attribute.model'
import { TargetModifier } from './target-modifier.model'

export class ObstacleModel {
  id: string
  name: string
  attributes: Array<AttributeModel>
  description: string
  stamina?: number // [0, 1]: 0 = DEFEATED
  isDefeated?: boolean // false

  // final checks when entering Quest.phase = 'COMBAT'
  results: [{
    threshold: number
    chance: number
    modifiers: Array<TargetModifier>
  }?]
}

/* Example Obstacle:
[Environment] - Security Cameras
[results] A stamina of .2 will add 6 random goons total
* If stamina = 0, DISABLED
* If stamina > .4 +2 random goons at a chance of .5%
* If stamina > .6 +2 random goons at a chance of .5%
* If stamina > .8 +2 random goons at a chance of .5%
* If stamina = 1 +2 random goons at a chance of .5%
*/

export class EnvironmentObstacleModel extends ObstacleModel {

}

/* Example Obstacle:
[NPC] - Superman
[Attributes] - [Invulernable: Kryptonite, Fast, Strong, Laser Eyes]
A few items are good against Superman
* [Kryptonite Gun] - if (NPC.has_attribute('Invulernable: Kryptonite')) NPC.stamina = 1
* [Kryptonite Shard] - if (NPC.has_attribute('Invulernable: Kryptonite')) NPC.stamina .5
*/

export class NPCObstacleModel extends ObstacleModel {

}

// targetType[targetId].targetStat = targetType[targetId].targetStat {{targetChangeSymbol}} targetChange
