import { NgModule } from '@angular/core'
import { Routes } from '@angular/router'
import { NativeScriptRouterModule } from 'nativescript-angular/router'

import { InventoryComponent } from './inventory.component'

const routes: Routes = [
  { path: '', component: InventoryComponent },
]

@NgModule({
  imports: [NativeScriptRouterModule.forChild(routes)],
  exports: [NativeScriptRouterModule]
})
export class InventoryRoutingModule { }
