import { Component, OnInit } from '@angular/core'
import { RadSideDrawer } from 'nativescript-ui-sidedrawer'
import * as app from 'tns-core-modules/application'
import { GameState } from '../states/game.state'
import { Start, Pause, ChangeSpeed } from '../states/game.actions'
import { Store, Select } from '@ngxs/store'
import { Observable } from 'rxjs'

@Component({
  selector: 'Home',
  moduleId: module.id,
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  @Select(GameState.currentTime)
  currentTime$: Observable<number>

  constructor(private store: Store) {
    // Use the component constructor to inject providers.
  }

  ngOnInit(): void {
    // do nothing
  }

  onPause(event: any) {
    this.store.dispatch(new Pause())
  }

  onPlay(event: any) {
    this.store.dispatch(new ChangeSpeed(1))
  }

  onSpeed(event: any) {
    this.store.dispatch(new ChangeSpeed(2))
  }

  onDrawerButtonTap(): void {
    const sideDrawer = <RadSideDrawer>app.getRootView()
    sideDrawer.showDrawer()
  }
}
