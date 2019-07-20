export class QuestModel {
  id: string
  name: string
  description: string

  isNew?: boolean // keeps track of NEW when viewing
  isVisible?: boolean

  availableTime?: number
  acceptedTime?: number
  rejectedTime?: number
  completedTime?: number

  location: {
    x: number
    y: number
  }

  goons?: number // Usually always 0, if > 0, generate or retrieve NPCs before combat (these are random)
  obstacles: Array<string> // ObstacleModel.id

  rewards: {
    experience?: number
    gold?: number
    // items?: [...Item]
    // heros?: [...Hero]
    // quests?: [...Quest] // Follow up quests!
  }
}
