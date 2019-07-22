import { MissionComponent } from './mission/mission.component'
import { MissionsComponent } from './missions.component'
import { NativeScriptRouterModule } from 'nativescript-angular/router'
import { NgModule } from '@angular/core'
import { Routes } from '@angular/router'

const routes: Routes = [
  { path: '', component: MissionsComponent },
  { path: ':missionId', component: MissionComponent },
]

@NgModule({
  imports: [NativeScriptRouterModule.forChild(routes)],
  exports: [NativeScriptRouterModule]
})
export class MissionsRoutingModule { }
