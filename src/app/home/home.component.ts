import * as app from 'tns-core-modules/application'
import { Component, OnInit } from '@angular/core'
import { GameState } from '../states/game.state'
import { Observable } from 'rxjs'
import { RadSideDrawer } from 'nativescript-ui-sidedrawer'
import { Start, Pause, ChangeSpeed } from '../states/game.actions'
import { StateClear, StateResetAll } from 'ngxs-reset-plugin'
import { Store, Select } from '@ngxs/store'

@Component({
  selector: 'Home',
  moduleId: module.id,
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  @Select(GameState.currentTime)
  currentTime$: Observable<number>

  constructor(private store: Store) {
    // Use the component constructor to inject providers.
  }

  ngOnInit(): void {
    // Nothing
  }

  onDrawerButtonTap(): void {
    const sideDrawer = <RadSideDrawer>app.getRootView()
    sideDrawer.showDrawer()
  }

  onReset(event: Event) {
    this.store.dispatch(new StateClear())
    this.store.dispatch(new StateResetAll())
  }
}
