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
}
