import * as app from 'tns-core-modules/application'
import { ActivatedRoute } from '@angular/router'
import { Component, OnInit, ViewContainerRef } from '@angular/core'
import { GameState } from '../../states/game.state'
import { MissionCompleteModalComponent } from '../mission-complete-modal/mission-complete-modal.component'
import { MissionModel } from '../../models/mission.model'
import { MissionStateModel } from '../../states/missions/missions.model'
import { MissionsState } from '../../states/missions/missions.state'
import { ModalDialogService, ModalDialogOptions } from 'nativescript-angular/modal-dialog'
import { Observable } from 'rxjs'
import { RadSideDrawer } from 'nativescript-ui-sidedrawer'
import { RouterExtensions } from 'nativescript-angular/router'
import { Store, Select, Actions, ofActionSuccessful } from '@ngxs/store'
import { CompleteMission } from '~/app/states'

@Component({
  selector: 'ns-mission',
  templateUrl: './mission.component.html',
  styleUrls: ['./mission.component.css']
})
export class MissionComponent implements OnInit {
  tabSelectedIndex = 0
  @Select(GameState.currentTime)
  currentTime$: Observable<number>

  @Select(MissionsState.availableMissions)
  availableMissions$: Observable<MissionStateModel>

  activeMission: MissionModel
  totalCaseTime = 0

  constructor(
    private store: Store,
    private routerExtensions: RouterExtensions,
    private route: ActivatedRoute,
    private modalService: ModalDialogService,
    private _vcRef: ViewContainerRef,
    private actions$: Actions,
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      let missionId: string
      missionId = params.get('missionId')
      this.store.select(MissionsState.missionById).subscribe(fn => {
        this.activeMission = fn(missionId)
      })
    })
    this.actions$.pipe(ofActionSuccessful(CompleteMission)).subscribe(() => this.showMissionCompleteModal())
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

  showMissionCompleteModal() {
    const options: ModalDialogOptions = {
      viewContainerRef: this._vcRef,
      context: {
        name: 'name',
        value: 'VALUE',
        meaning_up: 'UP',
        meaning_rev: 'DOWN',
        mission: this.activeMission
      },
      fullscreen: false
    }

    this.modalService.showModal(MissionCompleteModalComponent, options).then((result: any) => {
      if (result) {
        console.log(result)
      } else {
        console.log('nothing')
      }
    })
  }

  onDrawerButtonTap(): void {
    const sideDrawer = <RadSideDrawer>app.getRootView()
    sideDrawer.showDrawer()
  }
}
