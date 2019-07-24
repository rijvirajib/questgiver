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
  [TARGET_CHANGE_SYMBOL['+']] : (x: number, y: any) => {
    return x + y
  },
  [TARGET_CHANGE_SYMBOL['*']] : (x: number, y: any) => {
      return x * y
  },
  [TARGET_CHANGE_SYMBOL['=']] : (x: any) => {
    return x
  }
}
