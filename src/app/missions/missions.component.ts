import * as app from 'tns-core-modules/application'
import { Component, Input, ChangeDetectionStrategy } from '@angular/core'
import { GameState } from '../states/game.state'
import { Observable } from 'rxjs'
import { QuestStateModel } from '../states/quests/quests.model'
import { QuestsState } from '../states/quests/quests.state'
import { RadSideDrawer } from 'nativescript-ui-sidedrawer'
import { Store, Select } from '@ngxs/store'
import { QuestModel } from '../models/quest.model'

@Component({
  selector: 'ns-missions',
  templateUrl: './missions.component.html',
  styleUrls: ['./missions.component.css']
})
export class MissionsComponent {
  @Select(GameState.currentTime)
  currentTime$: Observable<number>

  @Select(QuestsState.availableQuests)
  availableQuests$: Observable<QuestStateModel>

  constructor(private store: Store) {
    this.availableQuests$.subscribe(res => {
      console.log('all quests loaded', res)
    })
  }

  onTap(quest: QuestModel) {
    console.log('------------------------ ItemTapped: ', quest)
  }

  onDrawerButtonTap(): void {
    const sideDrawer = <RadSideDrawer>app.getRootView()
    sideDrawer.showDrawer()
  }
}
