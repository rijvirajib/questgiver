import { MissionCompleteModalComponent } from './mission-complete-modal/mission-complete-modal.component'
import { MissionComponent } from './mission/mission.component'
import { MissionTabCrewComponent } from './tab/crew/tab-crew.component'
import { MissionTabDeployComponent } from './tab/deploy/tab-deploy.component'
import { MissionTabIntelComponent } from './tab/intel/tab-intel.component'
import { MissionsComponent } from './missions.component'
import { MissionsRoutingModule } from './missions-routing.module'
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core'
import { SharedModule } from '../shared.module'

@NgModule({
  imports: [
    SharedModule,
    MissionsRoutingModule,
  ],
  declarations: [
    MissionsComponent,
    MissionComponent,
    MissionTabIntelComponent,
    MissionTabCrewComponent,
    MissionTabDeployComponent,
    MissionCompleteModalComponent,
  ],
  entryComponents: [
    MissionCompleteModalComponent,
  ],
  schemas: [
    NO_ERRORS_SCHEMA,
  ]
})
export class MissionsModule { }
