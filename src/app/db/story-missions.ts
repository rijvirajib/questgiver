import { MissionModel, MISSION_STEP, TimesModel } from '../models/mission.model'
import { NPCModel, NPC_BASE_STAT } from '../models/npc.model'
import { NPC_ATTRIBUTES } from './attributes'
import { ObstacleModel, OBSTACLE_TYPE } from '../models/obstacle.model'
import { TargetModifier, TARGET_TYPE, TARGET_CHANGE_SYMBOL } from '../models/target-modifier.model'

export const STORYOBSTACLES: { [id: string]: ObstacleModel } = {
  CCTV: new ObstacleModel({
    id: 'CCTV',
    name: 'CCTV',
    description: 'Simple cameras. A tool should suffice.',
    isHidden: true,
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
  }),
  KEYPAD: new ObstacleModel({
    id: 'KEYPAD',
    name: 'Keypad',
    description: 'A keypad to gain entrance into loot area.',
    isHidden: true,
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
        targetChange: .9, // lose 10% of the gold
        targetChangeSymbol: TARGET_CHANGE_SYMBOL['*']
      }]
    }]
  }),
  SAFE: new ObstacleModel({
    id: 'SAFE',
    name: 'Safe',
    description: 'A safe that has a lot of money!',
    isHidden: true,
    caseTime: 10,
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
  }),
  MAGE: new ObstacleModel({
    id: 'MAGE',
    name: 'Mage',
    description: 'There are many tools to disable a mage.',
    isHidden: true,
    caseTime: 4,
    casedTime: 0,
    icon: '~/images/icons/mage.png',
    type: OBSTACLE_TYPE.NPC,
    npcId: 'STORYNPC1'
  }),
  CHAMELEON: new ObstacleModel({
    id: 'CHAMELEON',
    name: 'Chameleon',
    description: 'Chameleons can easily be seen by more than eyes.',
    isHidden: true,
    caseTime: 10,
    casedTime: 0,
    icon: '~/images/icons/chameleon.png',
    type: OBSTACLE_TYPE.NPC,
    npcId: 'STORYNPC2'
  }),
}

export const STORYMISSIONS: Array<MissionModel> = [new MissionModel({
  id: 'STORYMISSIONS1',
  name: 'Grocery Shopping',
  description: `After the licking we just took, we need to restock our fridge. Head on down to the KwikFix and get some groceries.`,
  successMessage: `Fantastic! You got the bread, eggs, and milk. Pancakes for everyone!`,
  failMessage: `What the.. this was a BASIC task. The council is already hangry! Go back and try again!`,
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
    STORYOBSTACLES.CCTV ,
    STORYOBSTACLES.KEYPAD,
    STORYOBSTACLES.MAGE,
    STORYOBSTACLES.CHAMELEON,
  ],
  rewards: {
    experience: 120,
    gold: 239
  }
}), new MissionModel({
  id: 'STORYMISSIONS2',
  name: 'Stock the Pantry',
  description: `Oh no, we can't make pancakes without sugar and some vanilla. The KwikFix is closed, so head down to the Priceco and buy some in bulk.`,
  successMessage: `Awesome! We can finally make those pancakes. We just grabbed one of Pigman's pigs for the bacon.`,
  failMessage: `Didn't think going to Priceco would be so hard... we still need that sugar.`,
  icon: '~/images/icons/convenience-store.png',
  isAvailable: false,
  isNew: true,
  step: MISSION_STEP.Unaccepted,
  totalCasedTime: 0,
  times: new TimesModel(),
  location: {
    x: 1,
    y: 1
  },
  caseCost: 300,
  crew: {},
  obstacles: [
    STORYOBSTACLES.CCTV,
    STORYOBSTACLES.CCTV,
    STORYOBSTACLES.MAGE,
    STORYOBSTACLES.CHAMELEON,
    STORYOBSTACLES.SAFE,
  ],
  rewards: {
    experience: 132,
    gold: 439
  }
})]
