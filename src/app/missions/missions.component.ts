import * as app from 'tns-core-modules/application'
import { Component, Input, ChangeDetectionStrategy } from '@angular/core'
import { RouterExtensions } from 'nativescript-angular/router'
import { GameState } from '../states/game.state'
import { Observable } from 'rxjs'
import { MissionStateModel } from '../states/missions/missions.model'
import { MissionsState } from '../states/missions/missions.state'
import { RadSideDrawer } from 'nativescript-ui-sidedrawer'
import { Store, Select } from '@ngxs/store'
import { MissionModel } from '../models/mission.model'

@Component({
  selector: 'ns-missions',
  templateUrl: './missions.component.html',
  styleUrls: ['./missions.component.css']
})
export class MissionsComponent {
  @Select(GameState.currentTime)
  currentTime$: Observable<number>

  @Select(MissionsState.availableMissions)
  availableMissions$: Observable<MissionStateModel>

  constructor(
    private store: Store,
    private routerExtensions: RouterExtensions
  ) {}

  onTapMission(mission: MissionModel) {
    this.routerExtensions.navigate(['/missions/', mission.id], {
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

  onViewMission() {
    this.routerExtensions.navigate(['/detail'], {
      animated: true,
      transition: {
        name: 'slideLeft',
        duration: 200,
        curve: 'easeIn'
      }
    })
  }
}
