import * as app from 'tns-core-modules/application'
import { ActivatedRoute } from '@angular/router'
import { Component, Input, ChangeDetectionStrategy, OnInit } from '@angular/core'
import { GameState } from '../../states/game.state'
import { Observable } from 'rxjs'
import { MissionModel } from '../../models/mission.model'
import { MissionStateModel } from '../../states/missions/missions.model'
import { MissionsState } from '../../states/missions/missions.state'
import { RadSideDrawer } from 'nativescript-ui-sidedrawer'
import { RouterExtensions } from 'nativescript-angular/router'
import { Store, Select } from '@ngxs/store'
import { map, mergeMap } from 'rxjs/operators'

@Component({
  selector: 'ns-mission',
  templateUrl: './mission.component.html',
  styleUrls: ['./mission.component.css']
})
export class MissionComponent implements OnInit {
  @Select(GameState.currentTime)
  currentTime$: Observable<number>

  @Select(MissionsState.availableMissions)
  availableMissions$: Observable<MissionStateModel>

  activeMission: MissionModel

  constructor(
    private store: Store,
    private routerExtensions: RouterExtensions,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      let missionId: string
      missionId = params.get('missionId')
      this.store.select(MissionsState.missionById).subscribe(fn => {
        this.activeMission = fn(missionId)
      })
    })
  }

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
}
