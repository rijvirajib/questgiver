export class TargetModifier {
  targetType: TARGET_TYPE
  targetID?: string
  targetKey: string
  targetChange: number | boolean
  targetChangeSymbol: TARGET_CHANGE_SYMBOL
  undoModifiers?: boolean

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
  NPC,
  ITEM
}

export enum TARGET_CHANGE_SYMBOL {
  '+',
  '*',
  '=',
  'bool'
}
