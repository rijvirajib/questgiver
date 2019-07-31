import { AcceptMission, RejectMission, HireCrew, FireCrew } from '~/app/states'
import { Component, OnInit, Input } from '@angular/core'
import { EQUIP_CLASS, ItemModel } from '~/app/models/item.model'
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
    selector: 'tab-crew',
    moduleId: module.id,
    templateUrl: './tab-crew.component.html',
    styleUrls: ['./tab-crew.component.scss']
})
export class MissionTabCrewComponent implements OnInit {
  @Input() activeMission: MissionModel
  activeMission$: Observable<MissionModel>

  @Select(MissionsState.availableVillains)
  availableVillains$: Observable<MissionStateModel>

  // This observable doesn't work for some reason when the initial response is []
  hiredVillains$: Observable<Array<NPCModel>>
  inventory$: Observable<{[id: string]: ItemModel}>

  constructor(
    private store: Store,
    private routerExtensions: RouterExtensions
  ) {}

  ngOnInit() {
    this.activeMission$ = this.store.select(MissionsState.missionById).pipe(map(filterFn => filterFn(this.activeMission.id)))
    this.activeMission$.subscribe(aM => {
      this.activeMission = aM
    })
    this.hiredVillains$ = this.store.select(MissionsState.crewByMissionId).pipe(map(filterFn => filterFn(this.activeMission.id)))
    this.inventory$ = this.store.select(state => state.missions.inventory)
  }

  fire(villain: NPCModel) {
    this.store.dispatch(
      new FireCrew(this.activeMission, villain))
  }

  hire(villain: NPCModel) {
    this.store.dispatch(
      new HireCrew(this.activeMission, villain))
  }

  onTapEquip(villain: NPCModel, equipClass: string) {
    this.routerExtensions.navigate(['/inventory'], {
      queryParams: {
        missionId: this.activeMission.id,
        npcId: villain.id,
        equipClass
      },
      transition: {
        name: 'slideTop'
      }
    })
  }

  isSlotAvailable(villain: NPCModel, equipClass: string) {
    if (equipClass === EQUIP_CLASS.Trinket) {
      return villain.trinkets.length < villain.maxTrinkets
    }

    return !villain.gear[equipClass] || (villain.gear && !villain.gear[equipClass].isSignature)
  }
}
