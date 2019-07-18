import { QuestModel } from '../models/quest.model'
import { ObstacleModel } from '../models/obstacle.model'
import { TargetModifier, TARGET_TYPE, TARGET_CHANGE_SYMBOL } from '../models/target-modifier.model'

export const STORYMODIFIERS: Array<TargetModifier> = [
  {
    targetType: TARGET_TYPE.QUEST,
    targetID: 'STORYQUESTS1',
    targetKey: 'quest.goons',
    targetChange: 2,
    targetChangeSymbol: TARGET_CHANGE_SYMBOL['+']
  },
]

export const STORYOBSTACLES: Array<ObstacleModel> = [
  {
    id: 'STORYOBSTACLES1',
    name: 'CCTV',
    description: 'The Kwik Fix has some cameras. Address them to avoid more goons.',
    attributes: [],
    results: [{
      threshold: .4,
      chance: .5,
      modifiers: [
        STORYMODIFIERS[0],
      ]
    }, {
      threshold: .6,
      chance: .5,
      modifiers: [
        STORYMODIFIERS[0],
      ]
    }, {
      threshold: .6,
      chance: .5,
      modifiers: [
        STORYMODIFIERS[0],
      ]
    }, {
      threshold: 1,
      chance: .5,
      modifiers: [
        STORYMODIFIERS[1],
      ]
    }]
  },
]

export const STORYQUESTS: Array<QuestModel> = [
  {
    id: 'STORYQUESTS1',
    name: 'Kwik Fix',
    description: 'First mission. Unfortunately you are going to be fighting Superman',
    location: {
      x: 1,
      y: 1
    },
    obstacles: [STORYOBSTACLES[0].id],
    rewards: {
      gold: 100
    }
  },
]
