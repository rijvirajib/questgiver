import { MissionComponent } from './mission/mission.component'
import { MissionsComponent } from './missions.component'
import { MissionsRoutingModule } from './missions-routing.module'
import { NativeScriptCommonModule } from 'nativescript-angular/common'
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core'

@NgModule({
  imports: [
    NativeScriptCommonModule,
    MissionsRoutingModule,
  ],
  declarations: [
    MissionsComponent,
    MissionComponent,
  ],
  schemas: [
    NO_ERRORS_SCHEMA,
  ]
})
export class MissionsModule { }
