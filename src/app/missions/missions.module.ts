import { MissionComponent } from './mission/mission.component'
import { MissionTabIntelComponent } from './tab/intel/tab-intel.component'
import { MissionsComponent } from './missions.component'
import { MissionsRoutingModule } from './missions-routing.module'
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core'
import { SharedModule } from '../shared.module'
import { MissionTabCrewComponent } from './tab/crew/tab-crew.component'
import { MissionTabDeployComponent } from './tab/deploy/tab-deploy.component'

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
  ],
  schemas: [
    NO_ERRORS_SCHEMA,
  ]
})
export class MissionsModule { }
