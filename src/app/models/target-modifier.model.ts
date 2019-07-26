export class TargetModifier {
  targetType: TARGET_TYPE
  targetID?: string
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
    this.targetID = params.targetID
    this.targetKey = params.targetKey
    this.willDisable = params.willDisable || false
    this.targetChange = params.targetChange || 0
    this.targetChangeSymbol = params.targetChangeSymbol || TARGET_CHANGE_SYMBOL['*']
  }
}

// Ordered by tick priority
export enum TARGET_TYPE {
  GAME = 0,
  CHARACTER,
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
