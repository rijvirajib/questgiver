import { MissionStateModel } from '../states/missions/missions.model'

export class TargetModifier {

  static modifyTarget(state: MissionStateModel, modifier: TargetModifier) {
    if (modifier.targetType === TARGET_TYPE.NPC) {
      const npc = state.npcs[modifier.targetId]
      state.npcs[modifier.targetKey] = TARGET_MODIFIER_RUNNER[modifier.targetChangeSymbol](npc[modifier.targetKey], modifier.targetChange)
    }
    if (modifier.targetType === TARGET_TYPE.ITEM) {
      const item = state.inventory[modifier.targetId]
      state.npcs[modifier.targetKey] = TARGET_MODIFIER_RUNNER[modifier.targetChangeSymbol](item[modifier.targetKey], modifier.targetChange)
    }
    if (modifier.targetType === TARGET_TYPE.QUEST) {
      const mission = state.missions[modifier.targetId]

      if (modifier.targetKey === 'rewards.gold') {
        state.missions[modifier.targetId].rewards.gold = TARGET_MODIFIER_RUNNER[modifier.targetChangeSymbol](mission.rewards.gold, modifier.targetChange)
      } else if (modifier.targetKey === 'rewards.experience') {
        state.missions[modifier.targetId].rewards.experience = TARGET_MODIFIER_RUNNER[modifier.targetChangeSymbol](mission.rewards.experience, modifier.targetChange)
      } else {
        state.missions[modifier.targetId][modifier.targetKey] = TARGET_MODIFIER_RUNNER[modifier.targetChangeSymbol](mission[modifier.targetKey], modifier.targetChange)
      }
    }

    return state
  }

  targetType: TARGET_TYPE
  targetId?: string
  targetKey?: string
  willDisable?: boolean // Will the target be disabled?
  targetChange?: number | boolean
  targetChangeSymbol?: TARGET_CHANGE_SYMBOL

  dot?: {
    dotTick: number
    dotMaxTicks?: number
  }

  constructor(params: any) {
    this.targetType = params.targetType
    this.targetId = params.targetId
    this.targetKey = params.targetKey
    this.willDisable = params.willDisable || false
    this.targetChange = params.targetChange || 0
    this.targetChangeSymbol = params.targetChangeSymbol || TARGET_CHANGE_SYMBOL['*']
  }
}

// Ordered by tick priority
// Ordered by tick priority
export enum TARGET_TYPE {
  GAME = 0,
  CHARACTER, // not sure if character is ever needed
  QUEST,
  OBSTACLE,
  ATTRIBUTE,
  ITEM,
  NPC,
  ENEMY
}

export enum TARGET_CHANGE_SYMBOL {
  '+',
  '*',
  '='
}

export const TARGET_MODIFIER_RUNNER = {
  [TARGET_CHANGE_SYMBOL['+']] : (x: number, y: any, undo = false) => {
    if (undo) {
      return x - y
    }

    return x + y
  },
  [TARGET_CHANGE_SYMBOL['*']] : (x: number, y: any, undo = false) => {
    if (undo) {
      return x / y
    }

    return x * y
  },
  [TARGET_CHANGE_SYMBOL['=']] : (x: any, undo = false) => {
    if (undo && typeof x === 'boolean') {
      return !x
    }

    return x
  }
}
