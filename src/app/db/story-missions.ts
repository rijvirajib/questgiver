import { MissionModel, MISSION_STEP, TimesModel } from '../models/mission.model'
import { NPCModel, NPC_BASE_STAT } from '../models/npc.model'
import { NPC_ATTRIBUTES } from './attributes'
import { ObstacleModel, OBSTACLE_TYPE } from '../models/obstacle.model'
import { TargetModifier, TARGET_TYPE, TARGET_CHANGE_SYMBOL } from '../models/target-modifier.model'

export const STORYMODIFIERS: Array<TargetModifier> = [{
  targetType: TARGET_TYPE.QUEST,
  targetKey: 'goons',
  targetChange: 1,
  targetChangeSymbol: TARGET_CHANGE_SYMBOL['+']
}, {
  targetType: TARGET_TYPE.QUEST,
  targetKey: 'rewards.gold',
  targetChange: -.5, // lose 50% of the gold
  targetChangeSymbol: TARGET_CHANGE_SYMBOL['*']
}]

export const STORYNPCS: { [id: string]: NPCModel } = {
  STORYNPC1: new NPCModel({
    id: 'STORYNPC1',
    name: 'Kwik Fix Magician',
    description: 'Just a simple magician working for the Kwik Fix store.',
    level: 1,
    baseStat: NPC_BASE_STAT.NRG,
    attributes: [
      NPC_ATTRIBUTES.MAGE, // just mage
    ]
  }),
  STORYNPC2: new NPCModel({
    id: 'STORYNPC2',
    name: 'Kwik Fix Chameleon',
    description: 'Can be anyone or anything. Hard to hit and can take a hard hit.',
    level: 1,
    baseStat: NPC_BASE_STAT.NRG,
    attributes: [
      NPC_ATTRIBUTES.CHAMELEON, // just a chameleon
    ]
  })
}

export const STORYOBSTACLES: Array<ObstacleModel> = [{
  id: 'STORYOBSTACLES0',
  name: 'CCTV',
  description: 'Simple cameras. A tool should suffice.',
  caseTime: 4,
  casedTime: 0,
  icon: '~/images/icons/cctv.png',
  type: OBSTACLE_TYPE.CCTV,
  results: {
    .4: {
      chance: .5,
      modifiers: [
        STORYMODIFIERS[0],
      ]
    }
  }
}, {
  id: 'STORYOBSACLES1',
  name: 'Mage',
  description: 'There are many tools to disable a mage.',
  caseTime: 4,
  casedTime: 0,
  icon: '~/images/icons/mage.png',
  type: OBSTACLE_TYPE.NPC,
  npcId: 'STORYNPC1'
}, {
  id: 'STORYOBSTACLES2',
  name: 'Keypad',
  description: 'A keypad to gain entrance into loot area.',
  caseTime: 4,
  casedTime: 0,
  icon: '~/images/icons/keypad.png',
  type: OBSTACLE_TYPE.KEYPAD,
  results: {
    .5: {
      chance: 1,
      modifiers: [
        STORYMODIFIERS[1],
      ]
    }
  }
}, {
  id: 'STORYOBSTACLES3',
  name: 'Chameleon',
  description: 'Chameleons can easily be seen by more than eyes.',
  isHidden: true,
  caseTime: 10,
  casedTime: 0,
  icon: '~/images/icons/chameleon.png',
  type: OBSTACLE_TYPE.NPC,
  npcId: 'STORYNPC2'
}]

export const STORYMISSIONS: Array<MissionModel> = [{
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
  caseCost: 1230,
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
}]
