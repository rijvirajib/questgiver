import { NativeScriptCommonModule } from 'nativescript-angular/common'
import { NgModule } from '@angular/core'
import { SpeedComponent } from './speed/speed.component'

@NgModule({
  imports: [
    NativeScriptCommonModule,
  ],
  exports : [
    NativeScriptCommonModule,
    SpeedComponent,
  ],
  declarations: [ SpeedComponent ]
})
export class SharedModule { }
