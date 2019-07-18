import { QuestModel } from '../models/quest.model'
import { ObstacleModel } from '../models/obstacle.model'
import { TargetModifier, TARGET_TYPE, TARGET_CHANGE_SYMBOL } from '../models/target-modifier.model'

export const STORYMODIFIERS: Array<TargetModifier> = [
  {
    targetType: TARGET_TYPE.QUEST,
    targetID: '1',
    targetKey: 'rewards.gold',
    targetChange: -50,
    targetChangeSymbol: TARGET_CHANGE_SYMBOL['+']
  },
]

export const STORYOBSTACLES: Array<ObstacleModel> = [
  {
    id: '1',
    name: 'Security Camera',
    description: 'The Kwik Fix has ',
    attributes: [],
    results: [{
      threshold: 1,
      chance: 1,
      modifiers: [
        STORYMODIFIERS[0],
      ]
    }]
  },
]

export const STORYQUESTS: Array<QuestModel> = [
  {
    id: '1',
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
