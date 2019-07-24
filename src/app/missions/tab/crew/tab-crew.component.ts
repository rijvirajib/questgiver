import { AcceptMission, RejectMission } from '~/app/states'
import { Component, OnInit, Input } from '@angular/core'
import { EVENT_TYPES } from '~/app/models/event.model'
import { MissionModel, MISSION_STEP } from '~/app/models/mission.model'
import { Store } from '@ngxs/store'
@Component({
    selector: 'tab-crew',
    moduleId: module.id,
    templateUrl: './tab-crew.component.html',
    styleUrls: ['./tab-crew.component.css']
})
export class MissionTabCrewComponent {
  @Input() activeMission: MissionModel
  missionStep =  MISSION_STEP

  constructor(private store: Store) {}

  onTapObstacle(obstacle: any) {
    // do nothing
  }

  onReject() {
    this.store.dispatch(RejectMission)
  }

  onAccept() {
    this.store.dispatch(new AcceptMission(this.activeMission))
  }

  intelLog() {
    return this.activeMission.log.map(event => {
      if (event.type === EVENT_TYPES.INTEL) {
        return event.message
      }
    }).join('\n')
  }
}
