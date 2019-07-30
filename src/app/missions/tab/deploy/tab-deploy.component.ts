import { AcceptMission, RejectMission, HireCrew, FireCrew, DeployMission } from '~/app/states'
import { Component, OnInit, Input } from '@angular/core'
import { EQUIP_CLASS } from '~/app/models/item.model'
import { EVENT_TYPES } from '~/app/models/event.model'
import { MissionModel, MISSION_STEP } from '~/app/models/mission.model'
import { MissionStateModel } from '~/app/states/missions/missions.model'
import { MissionsState } from '~/app/states/missions/missions.state'
import { NPCModel } from '~/app/models/npc.model'
import { Observable } from 'rxjs'
import { RouterExtensions } from 'nativescript-angular/router'
import { Store, Select } from '@ngxs/store'
import { map } from 'rxjs/operators'
@Component({
    selector: 'tab-deploy',
    moduleId: module.id,
    templateUrl: './tab-deploy.component.html',
    styleUrls: ['./tab-deploy.component.scss']
})
export class MissionTabDeployComponent implements OnInit {
  @Input() activeMission: MissionModel
  activeMission$: Observable<MissionModel>
  crew: Array<NPCModel>
  heroes: Array<NPCModel>

  constructor(
    private store: Store,
    private routerExtensions: RouterExtensions
  ) {}

  ngOnInit() {
    // Do something
    this.activeMission$ = this.store.select(MissionsState.missionById).pipe(map(filterFn => filterFn(this.activeMission.id)))
    this.activeMission$.subscribe(aM => {
      this.activeMission = aM
      this.store.select(MissionsState.npcByIds).pipe(map(filterFn => filterFn([...aM.crewIds]))).subscribe(crew => {
        this.crew = crew || []
      })
      this.store.select(MissionsState.npcByIds).pipe(map(filterFn => filterFn([...aM.heroIds]))).subscribe(heroes => {
        this.heroes = heroes || []
      })
    })
  }

  isDeployable() {
    return this.activeMission.times.accepted && this.activeMission.crewIds.length > 0
  }

  onDeploy() {
    this.store.dispatch(new DeployMission(this.activeMission))
  }

  combatLog() {
    return this.activeMission.log.map(event => {
      if (event.type === EVENT_TYPES.COMBAT) {
        return event.message
      }
    }).join('\n')
  }
}
