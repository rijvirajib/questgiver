import { State, Action, StateContext, Selector } from '@ngxs/store'
import { Start, Tick, ChangeSpeed, Pause } from './game.actions'
import { GameStateModel } from './game.model'

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
const TICKSPEED = 1

@State<GameStateModel>({
  name: 'game',
  defaults: {
    time: 0,
    loop: null,
    currentScreen: 'home',
    paused: false,
    speed: TICKSPEED,
    loading: false,

    gold: 0,
  },
})

export class GameState {
  @Selector()
  static currentTime(state: GameStateModel) {
    return state.time
  }

  @Selector()
  static currentGold(state: GameStateModel) {
    return state.gold
  }

  @Selector()
  static currentSpeed(state: GameStateModel) {
    return state.speed
  }

  @Action(Start)
  start({getState, patchState, dispatch}: StateContext<GameStateModel>) {
    const state = getState()
    // Do not run it more than once
    if (state.loop) {
      return
    }
    const loop = setInterval(() => {
      dispatch(new Tick())
    }, (1 / state.speed) * 1000)
    patchState({loop})
  }

  @Action(Tick)
  tick({getState, patchState }: StateContext<GameStateModel>) {
    const state = getState()
    patchState({
      time: state.time + 1,
    })
  }

  @Action(ChangeSpeed)
  changeSpeed(
    {getState, patchState, dispatch }: StateContext<GameStateModel>,
    { payload }: ChangeSpeed,
  ) {
    const state = getState()
    if (state.loop) {
      clearInterval(state.loop)
    }
    const loop = setInterval(() => {
      dispatch(new Tick())
    }, (1 / payload) * 1000)
    patchState({
      loop,
      speed: payload,
    })
  }

  @Action(Pause)
  pause({getState, patchState}: StateContext<GameStateModel>) {
    const state = getState()
    clearInterval(state.loop)
    patchState({
      loop: null,
    })
  }
}
