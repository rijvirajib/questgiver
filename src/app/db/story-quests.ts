import { QuestModel } from '../models/quest.model'
import { ObstacleModel, OBSTACLE_TYPE } from '../models/obstacle.model'
import { TargetModifier, TARGET_TYPE, TARGET_CHANGE_SYMBOL } from '../models/target-modifier.model'
import { NPCModel, NPC_BASE_STATS } from '../models/npc.model'
import { NPC_ATTRIBUTES } from './attributes'

export const STORYMODIFIERS: Array<TargetModifier> = [
  {
    targetType: TARGET_TYPE.QUEST,
    targetKey: 'goons',
    targetChange: 1,
    targetChangeSymbol: TARGET_CHANGE_SYMBOL['+']
  },
]

export const STORYNPCS: { [id: string]: NPCModel } = {
  STORYNPC1: {
    id: 'STORYNPC1',
    name: 'Kwik Fix Magician',
    description: 'Just a simple magician working for the Kwik Fix store.',
    level: 1,
    baseStat: NPC_BASE_STATS.INT,
    BASE: {
      STR: 10,
      DEX: 10,
      INT: 10
    },
    attributes: [
      NPC_ATTRIBUTES.MAGE.id, // just mage
    ]
  }
}

export const STORYOBSTACLES: Array<ObstacleModel> = [{
  id: 'STORYOBSTACLES1',
  name: 'CCTV',
  description: 'The Kwik Fix has some cameras. Address them to avoid more goons.',
  type: [OBSTACLE_TYPE.CCTV],
  results: {
    .4: {
      chance: .5,
      modifiers: [
        STORYMODIFIERS[0],
      ]
    }
  }
}, {
  id: 'STORYOBSACLES2',
  name: 'Magic NPC',
  description: 'A Magic NPC is guarding the Kwik Fix Store. Weaken them before combat.',
  type: [OBSTACLE_TYPE.NPC],
  npcId: 'STORYNPC1'
}]

export const STORYQUESTS: Array<QuestModel> = [{
  id: 'STORYQUESTS1',
  name: 'Kwik Fix',
  description: `The Guild is hurting for money and we need some starting cash. Hit the Kwik Fix Store and grab some cash. Our intel shows least 1 Level 1 Magic Hero and Level 1 CCTV.`,
  isAvailable: true,
  location: {
    x: 1,
    y: 1
  },
  obstacles: [STORYOBSTACLES[0].id],
  rewards: {
    gold: 100
  }
}]
