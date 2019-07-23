import { ObstacleModel } from './obstacle.model'

export class MissionModel {
  id: string
  name: string
  description: string
  icon?: string

  isAvailable?: boolean
  isVisible?: boolean
  isNew?: boolean // keeps track of NEW when viewing
  step: MISSION_STEP

  availableTime?: number
  rejectedTime?: number
  acceptedTime?: number
  casedTime?: number
  completedTime?: number

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
