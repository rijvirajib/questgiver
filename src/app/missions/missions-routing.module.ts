import { NgModule } from '@angular/core'
import { Routes } from '@angular/router'
import { NativeScriptRouterModule } from 'nativescript-angular/router'

import { MissionsComponent } from './missions.component'

const routes: Routes = [
  { path: '', component: MissionsComponent },
]

@NgModule({
  imports: [NativeScriptRouterModule.forChild(routes)],
  exports: [NativeScriptRouterModule]
})
export class MissionsRoutingModule { }
