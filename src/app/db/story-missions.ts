import { MissionModel, MISSION_STEP, TimesModel } from '../models/mission.model'
import { NPCModel, NPC_BASE_STAT } from '../models/npc.model'
import { NPC_ATTRIBUTES } from './attributes'
import { ObstacleModel, OBSTACLE_TYPE } from '../models/obstacle.model'
import { TargetModifier, TARGET_TYPE, TARGET_CHANGE_SYMBOL } from '../models/target-modifier.model'

export const STORYOBSTACLES: Array<ObstacleModel> = [new ObstacleModel({
  id: 'STORYOBSTACLES0',
  name: 'CCTV',
  description: 'Simple cameras. A tool should suffice.',
  caseTime: 4,
  casedTime: 0,
  icon: '~/images/icons/cctv.png',
  type: OBSTACLE_TYPE.CCTV,
  results: [{
    chance: .5,
    modifiers: [{
      targetType: TARGET_TYPE.QUEST,
      targetId: 'STORYMISSIONS1',
      targetKey: 'goons',
      targetChange: 1,
      targetChangeSymbol: TARGET_CHANGE_SYMBOL['+']
    }]
  }]
}), new ObstacleModel({
  id: 'STORYOBSACLES1',
  name: 'Mage',
  description: 'There are many tools to disable a mage.',
  caseTime: 4,
  casedTime: 0,
  icon: '~/images/icons/mage.png',
  type: OBSTACLE_TYPE.NPC,
  npcId: 'STORYNPC1'
}), new ObstacleModel({
  id: 'STORYOBSTACLES2',
  name: 'Keypad',
  description: 'A keypad to gain entrance into loot area.',
  caseTime: 4,
  casedTime: 0,
  icon: '~/images/icons/keypad.png',
  type: OBSTACLE_TYPE.KEYPAD,
  results: [{
    chance: 1,
    modifiers: [{
      targetType: TARGET_TYPE.QUEST,
      targetId: 'STORYMISSIONS1',
      targetKey: 'rewards.gold',
      targetChange: .5, // lose 50% of the gold
      targetChangeSymbol: TARGET_CHANGE_SYMBOL['*']
    }]
  }]
}), new ObstacleModel({
  id: 'STORYOBSTACLES3',
  name: 'Chameleon',
  description: 'Chameleons can easily be seen by more than eyes.',
  isHidden: true,
  caseTime: 10,
  casedTime: 0,
  icon: '~/images/icons/chameleon.png',
  type: OBSTACLE_TYPE.NPC,
  npcId: 'STORYNPC2'
})]

export const STORYMISSIONS: Array<MissionModel> = [new MissionModel({
  id: 'STORYMISSIONS1',
  name: 'Kwik Fix',
  description: `The Guild is hurting for money and we need some starting cash. Hit the Kwik Fix Store and grab some loot.`,
  icon: '~/images/icons/convenience-store.png',
  isAvailable: true,
  isNew: true,
  step: MISSION_STEP.Unaccepted,
  totalCasedTime: 0,
  times: new TimesModel(),
  location: {
    x: 1,
    y: 1
  },
  caseCost: 120,
  crew: {},
  obstacles: [
    STORYOBSTACLES[3],
    STORYOBSTACLES[2],
    STORYOBSTACLES[1],
    STORYOBSTACLES[0],
  ],
  rewards: {
    experience: 100,
    gold: 100
  }
})]
