import { AcceptMission, RejectMission, StartCasing } from '~/app/states'
import { Component, OnInit, Input } from '@angular/core'
import { EVENT_TYPES } from '~/app/models/event.model'
import { MissionModel, MISSION_STEP } from '~/app/models/mission.model'
import { Store } from '@ngxs/store'
@Component({
    selector: 'tab-intel',
    moduleId: module.id,
    templateUrl: './tab-intel.component.html',
    styleUrls: ['./tab-intel.component.css']
})
export class MissionTabIntelComponent {
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

  onStartCasing() {
    this.store.dispatch(new StartCasing(this.activeMission))
  }

  intelLog() {
    return this.activeMission.log.filter(event => {
      if (event.type === EVENT_TYPES.INTEL) {
        return event
      }
    }).map(l => l.message).join('\n')
  }
}
