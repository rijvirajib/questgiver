export class EventModel {
  type: EVENT_TYPES
  time: number
  message: string
}

export enum EVENT_TYPES {
  PLAYER,
  WORLD,
  MISSION,
  INTEL,
  COMBAT
}
