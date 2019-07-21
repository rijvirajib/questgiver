import { GameState } from './game.state'
import { QuestsState } from './quests/quests.state'

export const GAMESTATES = [GameState, QuestsState]

export * from './game.actions'
export * from './quests/quests.actions'
