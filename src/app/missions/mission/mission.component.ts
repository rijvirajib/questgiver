import * as app from 'tns-core-modules/application'
import { Component, Input, ChangeDetectionStrategy } from '@angular/core'
import { GameState } from '../../states/game.state'
import { Observable } from 'rxjs'
import { QuestModel } from '../../models/quest.model'
import { QuestStateModel } from '../../states/quests/quests.model'
import { QuestsState } from '../../states/quests/quests.state'
import { RadSideDrawer } from 'nativescript-ui-sidedrawer'
import { RouterExtensions } from 'nativescript-angular/router'
import { Store, Select } from '@ngxs/store'

@Component({
  selector: 'ns-mission',
  templateUrl: './mission.component.html',
  styleUrls: ['./mission.component.css']
})
export class MissionComponent {
  @Select(GameState.currentTime)
  currentTime$: Observable<number>

  @Select(QuestsState.availableQuests)
  availableQuests$: Observable<QuestStateModel>

  constructor(
    private store: Store,
    private routerExtensions: RouterExtensions
  ) {}

  onTapQuest(quest: QuestModel) {
    console.log('we tapping')
    this.routerExtensions.navigate(['/missions/', quest.id], {
      animated: true,
      transition: {
        name: 'slideLeft',
        duration: 200,
        curve: 'easeIn'
      }
    })
  }

  onDrawerButtonTap(): void {
    const sideDrawer = <RadSideDrawer>app.getRootView()
    sideDrawer.showDrawer()
  }
}
