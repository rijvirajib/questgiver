import { CombatModel } from './combat.model'
import { EventModel } from './event.model'
import { ItemModel } from './item.model'
import { NPCModel } from './npc.model'
import { ObstacleModel } from './obstacle.model'
import { guid } from '../utils/uuid'

export class TimesModel {
  available?: number
  rejected?: number
  accepted?: number
  casing?: number
  cased?: number // When it was cased
  deployed?: number
  debreif?: number
  completed?: number
}

export class MissionReward {
  experience?: number
  gold?: number
  items?: Array<ItemModel>
  heros?: Array<NPCModel>
  quests?: Array<MissionModel> // Follow up quests!
}
export class MissionModel {
  id: string
  name: string
  description: string
  icon?: string

  isAvailable?: boolean
  isVisible?: boolean
  isNew?: boolean // keeps track of NEW when viewing
  step: MISSION_STEP
  status?: MISSION_STATUS

  times: TimesModel

  caseCost: number // obstacle.caseCost = caseCost / obstacle.caseTime
  totalCaseTime?: number
  totalCasedTime: number

  location: {
    x: number
    y: number
  }

  goons?: number // Usually always 0, if > 0, generate or retrieve NPCs before combat (these are random)
  obstacles: Array<ObstacleModel> // Store in reverse order for UI reasons...
  crewIds?: Array<string>
  heroIds?: Array<string>

  combat?: CombatModel

  rewards: MissionReward

  log?: Array<EventModel>
  failMessage?: string
  successMessage?: string

  constructor(params: any) {
    this.id = params.id || guid() // string
    this.name = params.name || 'Generic Mission' // string
    this.description = params.description || 'Generic Description' // string
    this.icon = params.icon || '~/images/icons/unknown.png' // string

    this.isAvailable = params.isAvailable !== false // boolean
    this.isVisible = params.isVisible !== false // boolean
    this.isNew = params.isNew !== false // boolean
    this.step = params.step || MISSION_STEP.Unaccepted

    this.times = params.times || new TimesModel() // TimesModel

    this.caseCost = params.caseCost || 100 // number
    this.totalCaseTime = params.totalCaseTime || 0 // number
    this.totalCasedTime = params.totalCasedTime || 0 // number

    this.location = {
      x: params.location ? params.location.x : 0,
      y: params.location ? params.location.y : 0
    }

    this.goons = params.goons || 0
    this.obstacles = params.obstacles || []
    this.crewIds = params.crewIds || []
    this.heroIds = params.heroIds || []
    this.status = params.status

    this.rewards = params.rewards || new MissionReward()

    this.log = params.log || []
    this.failMessage = params.failMessage
    this.successMessage = params.successMessage
  }
}

export enum MISSION_STEP {
  Unaccepted = 'Unaccepted',
  Accepted = 'Accepted',
  Intel = 'Intel',
  Ready = 'Ready',
  Deploy = 'Deploy',
  Combat = 'Combat',
  Escape = 'Escape',
  Rejected = 'Rejected',
  Complete = 'Complete',
}

export enum MISSION_STATUS {
  ACCEPTED,
  SUCCESS,
  FAIL,
  DRAW,
  REJECTED
}
