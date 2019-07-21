import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core'
import { NativeScriptCommonModule } from 'nativescript-angular/common'

import { MissionsRoutingModule } from './missions-routing.module'
import { MissionsComponent } from './missions.component'

@NgModule({
    imports: [
        NativeScriptCommonModule,
        MissionsRoutingModule,
    ],
    declarations: [
        MissionsComponent,
    ],
    schemas: [
        NO_ERRORS_SCHEMA,
    ]
})
export class MissionsModule { }
