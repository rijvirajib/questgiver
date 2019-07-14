import { LocationModel } from './location.model'

export class QuestModel {
  key: string
  name: string
  description: string
  location: LocationModel
  currentPosition: {
    x: number
    y: number
  }

  addedTime?: number
  acceptedTime?: number
  arriveTime?: number // how long it will take to complete mission
  completedTime?: number

  // type: enum // bounty? hunting? delivery? search?
  // requirements: {
  //   level?: number // sum total of all hero levels (ie 500 means at least 5 heroes at 100 level)
  //   monsters?: [...Monster] // any monsters that will be fought
  // }

  rewards: {
    gold?: number
    // items?: [...Item]
    // heros?: [...Hero]
    // quests?: [...Quest] // Follow up quests!
  }

  timeToComplete: number
  // monsters: [...Monster]

  // heroes?: [...Hero] // assigned heroes
  // items?: [...Item] // assigned items
  // log: [...Event] // this that happened in the quest
}
