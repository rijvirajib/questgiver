import { EventModel } from './event.model'
import { ObstacleModel } from './obstacle.model'

export class TimesModel {
  available?: number
  rejected?: number
  accepted?: number
  cased?: number // When it was cased
  completed?: number
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

  rewards: {
    experience?: number
    gold?: number
    // items?: [...Item]
    // heros?: [...Hero]
    // quests?: [...Mission] // Follow up quests!
  }

  log?: Array<EventModel>
}

// In order
export enum MISSION_STEP {
  Unaccepted = 'Unaccepted',
  Intel = 'Intel',
  Ready = 'Ready',
  Deploy = 'Deploy',
  Combat = 'Combat',
  Escape = 'Escape',
  Rejected = 'Rejected',
  Compelted = 'Compelted'
}
