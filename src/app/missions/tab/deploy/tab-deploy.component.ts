import { AcceptMission, RejectMission, HireCrew, FireCrew, DeployMission, AttackNPC, MissionLog } from '~/app/states'
import { Component, OnInit, Input } from '@angular/core'
import { EQUIP_CLASS } from '~/app/models/item.model'
import { EVENT_TYPES, EventModel } from '~/app/models/event.model'
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
  crew$: Observable<Array<NPCModel>>
  crew: Array<NPCModel>
  heroes: Array<NPCModel>
  isDeployable = false

  constructor(
    private store: Store,
    private routerExtensions: RouterExtensions
  ) {}

  ngOnInit() {
    // Do something
    this.activeMission$ = this.store.select(MissionsState.missionById).pipe(map(filterFn => filterFn(this.activeMission.id)))
    this.activeMission$.subscribe(aM => {
      this.activeMission = aM
      if (this.activeMission.times.accepted && this.activeMission.step === MISSION_STEP.Ready && this.activeMission.crewIds.length > 0
      ) {
        this.isDeployable = true
      } else {
        this.isDeployable = false
      }
      this.store.select(MissionsState.npcByIds).pipe(map(filterFn => filterFn([...aM.crewIds]))).subscribe(crew => {
        this.crew = crew || []
      })
      this.store.select(MissionsState.npcByIds).pipe(map(filterFn => filterFn([...aM.heroIds]))).subscribe(heroes => {
        this.heroes = heroes || []
      })
    })
    this.crew$ = this.store.select(MissionsState.npcByIds).pipe(map(filterFn => filterFn([...this.activeMission.crewIds])))
  }

  onDeploy() {
    this.store.dispatch(new DeployMission(this.activeMission))
    this.isDeployable = false
  }

  onAttack(npc: NPCModel, moveIndex: number) {
    if (npc.initiative >= 100) {
      this.store.dispatch(new AttackNPC(this.activeMission.id, npc.id, moveIndex))
    } else {
      this.store.dispatch(new MissionLog(
        this.activeMission.id, EVENT_TYPES.COMBAT, `${npc.name} tried to use ${npc.moves[moveIndex].name} too early!`
      ))
    }
  }

  combatLog() {
    return this.activeMission.log.filter(event => {
      if (event.type === EVENT_TYPES.COMBAT) {
        return event
      }
    }).map(l => l.message).reverse().join('\n')
  }
}
