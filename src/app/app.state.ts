import { State, Action, StateContext, Selector } from '@ngxs/store';
import { AppStateModel } from './models/app-state.model';
/* const gameState = {
  time: number,
  gold: number,
  player: {
    position: {
      x: 0,
      y: 0
    },
    rank: number,
  },
  inventory: [...Item],
  quests: [...Quest],
  heroes: [...Hero],
  locations: { // location position stored as key for easy filtering
    posXposY: Location
  }
}
*/

@State<AppStateModel>({
  name: 'app-state',
  defaults: {
    gold: 0,
    time: 0
  }
})

export class AppState {
  @Selector()
  static getTime(state: AppStateModel) {
    return state.time;
  }

  static getGold(state: AppStateModel) {
    return state.gold;
  }
}
