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

  goons?: number // Random Goons that will be generated
  obstacles: Array<string> // ObstacleModel.id

  rewards: {
    gold?: number
    // items?: [...Item]
    // heros?: [...Hero]
    // quests?: [...Quest] // Follow up quests!
  }
}
