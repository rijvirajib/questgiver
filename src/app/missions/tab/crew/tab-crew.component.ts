import { AcceptMission, RejectMission } from '~/app/states'
import { Component, OnInit, Input } from '@angular/core'
import { EVENT_TYPES } from '~/app/models/event.model'
import { MissionModel, MISSION_STEP } from '~/app/models/mission.model'
import { MissionStateModel } from '~/app/states/missions/missions.model'
import { MissionsState } from '~/app/states/missions/missions.state'
import { Observable } from 'rxjs'
import { Store, Select } from '@ngxs/store'
@Component({
    selector: 'tab-crew',
    moduleId: module.id,
    templateUrl: './tab-crew.component.html',
    styleUrls: ['./tab-crew.component.css']
})
export class MissionTabCrewComponent implements OnInit {
  @Input() activeMission: MissionModel

  @Select(MissionsState.availableVillains)
  availableVillains$: Observable<MissionStateModel>

  constructor(
    private store: Store
  ) {}

  ngOnInit() {
    // Do nothing
  }
}
