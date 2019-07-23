import { AcceptMission, RejectMission } from '~/app/states'
import { Component, OnInit, Input } from '@angular/core'
import { MissionModel } from '~/app/models/mission.model'
import { Store } from '@ngxs/store'
@Component({
    selector: 'tab-intel',
    moduleId: module.id,
    templateUrl: './tab-intel.component.html',
    styleUrls: ['./tab-intel.component.css']
})
export class MissionTabIntelComponent {
  @Input() activeMission: MissionModel

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
}
