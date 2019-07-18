import { AttributeModel, ATTRIBUTE_CLASS } from '../models/attribute.model'
import { TARGET_TYPE, TARGET_CHANGE_SYMBOL } from '../models/target-modifier.model'

export const ATTRIBUTES: { [id: string]: AttributeModel } = {
  INVULNERABLEKRYPTONITE: {
    id: 'INVULNERABLEKRYPTONITE',
    name: 'Invulernable/Kryptonite',
    description: 'Invulnerable to mostly everything except Kryptonite',
    class: ATTRIBUTE_CLASS.Invulnerable,
    rank: 1,
    conflicts: [],
    classConflicts: [
      ATTRIBUTE_CLASS.Invulnerable,
    ],
    weaknesses: [{
      items: [
        'INVULNERABLEKRYPTONITE',
      ],
      attributes: [
        'MAGIC', // Invulernables are weak to anyone with Magic character class
      ],
      modifiers: [{
        targetType: TARGET_TYPE.ATTRIBUTE,
        targetID: 'INVULNERABLEKRYPTONITE',
        targetKey: 'isDisabled',
        targetChange: true,
        targetChangeSymbol: TARGET_CHANGE_SYMBOL['='],
        undoModifiers: true
      }]
    }],
    modifiers: [{
      targetType: TARGET_TYPE.NPC,
      targetKey: 'DEX',
      targetChange: 99999,
      targetChangeSymbol: TARGET_CHANGE_SYMBOL['=']
    }]
  },
  MAGIC: {
    id: 'MAGIC',
    name: 'Magic',
    description: 'Character ',
    class: ATTRIBUTE_CLASS.Class, // These are chracter classes
    rank: 1
  }
}
