import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core'
import { InventoryRoutingModule } from './inventory-routing.module'
import { InventoryComponent } from './inventory.component'
import { SharedModule } from '../shared.module'

@NgModule({
  imports: [
    SharedModule,
    InventoryRoutingModule,
  ],
  declarations: [
    InventoryComponent,
  ],
  schemas: [
    NO_ERRORS_SCHEMA,
  ]
})
export class InventoryModule { }
