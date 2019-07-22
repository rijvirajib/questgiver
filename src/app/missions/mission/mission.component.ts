import * as app from 'tns-core-modules/application'
import { ActivatedRoute } from '@angular/router'
import { Component, Input, ChangeDetectionStrategy } from '@angular/core'
import { GameState } from '../../states/game.state'
import { Observable } from 'rxjs'
import { MissionModel } from '../../models/quest.model'
import { MissionStateModel } from '../../states/quests/quests.model'
import { MissionsState } from '../../states/quests/quests.state'
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

  @Select(MissionsState.availableMissions)
  availableMissions$: Observable<MissionStateModel>

  activeMission: MissionModel['id']

  constructor(
    private store: Store,
    private routerExtensions: RouterExtensions,
    private route: ActivatedRoute
  ) {
    this.activeMission = this.route.snapshot.paramMap.get('missionId')
  }

  onTapMission(quest: MissionModel) {
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
