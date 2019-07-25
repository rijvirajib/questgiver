import { AcceptMission, RejectMission, HireCrew, FireCrew } from '~/app/states'
import { Component, OnInit, Input } from '@angular/core'
import { EVENT_TYPES } from '~/app/models/event.model'
import { MissionModel, MISSION_STEP } from '~/app/models/mission.model'
import { MissionStateModel } from '~/app/states/missions/missions.model'
import { MissionsState } from '~/app/states/missions/missions.state'
import { NPCModel } from '~/app/models/npc.model'
import { Observable } from 'rxjs'
import { Store, Select } from '@ngxs/store'
import { map } from 'rxjs/operators'
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

  hiredVillains$: Observable<Array<NPCModel>>

  constructor(
    private store: Store
  ) {}

  ngOnInit() {
    this.hiredVillains$ = this.store.select(MissionsState.crewByMissionId).pipe(map(filterFn => filterFn(this.activeMission.id)))
  }

  fire(villain: NPCModel) {
    this.store.dispatch(
      new FireCrew(this.activeMission, villain))
  }

  hire(villain: NPCModel) {
    this.store.dispatch(
      new HireCrew(this.activeMission, villain))
  }
}
