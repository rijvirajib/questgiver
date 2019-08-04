import { FightMove } from './fight-move.model'
import { NPC_BASE_STAT } from './npc.model'
import { TargetModifier, TARGET_TYPE } from './target-modifier.model'
import { guid } from '../utils/uuid'

export class AttributeModel {
  id: string
  name: string
  class: ATTRIBUTE_CLASS
  baseStat?: NPC_BASE_STAT // Affiliated with what the base high stat will be
  description: string
  icon: string
  damageType?: ATTRIBUTE_CLASS.DAMAGE_TYPE

  level?: number

  classConflicts?: Array<ATTRIBUTE_CLASS>
  conflicts?: Array<AttributeModel>

  // If it's an item, usually

  modifiers?: Array<TargetModifier>

  canDisable?: boolean
  isDisabled?: boolean
  weaknesses?: Array<TargetModifier>
  moves: Array<FightMove>

  constructor(params) {
    this.id = params.id || guid()
    this.name = params.name || 'Attribute Random101010'
    this.class = params.class || ATTRIBUTE_CLASS.CHARACTER_CLASS
    this.baseStat = params.baseStat || NPC_BASE_STAT.STR
    this.description = params.description || 'Attribute Description Random101010'
    this.icon = params.icon || '~/images/icons/unknown.png'
    this.damageType = params.damageType || ATTRIBUTE_CLASS.DAMAGE_TYPE
    this.level = params.level || 1
    this.classConflicts = params.classConflicts || []
    this.conflicts = params.conflicts || []
    this.modifiers = params.modifers || []
    this.canDisable = !!params.canDisable
    this.isDisabled = !!params.isDisabled
    this.weaknesses = params.weakness || []
    this.moves = params.moves || []

  }

  toString() {
    return this.id
  }
}

export enum ATTRIBUTE_CLASS {
  'DAMAGE_TYPE', // Physical, Fire, Cold, Lightning, Poison, Arcane, Holy/Unholy
  'SKILL', //  Powers and Talents {Invulerable, Strength, Speed}
  'CHARACTER_CLASS' // Character base class
}
