import { Component, OnInit, Input } from '@angular/core'
import { MissionModel } from '~/app/models/mission.model'
@Component({
    selector: 'tab-intel',
    moduleId: module.id,
    templateUrl: './tab-intel.component.html',
    styleUrls: ['./tab-intel.component.css']
})
export class MissionTabIntelComponent {
  @Input() activeMission: MissionModel

  onTapObstacle(obstacle: any) {
    // do nothing
  }

  onReject() {
    // a
  }

  onAccept() {
    // a
  }
}
