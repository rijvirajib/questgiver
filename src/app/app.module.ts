import { AppComponent } from './app.component'
import { AppRoutingModule } from './app-routing.module'
import { AppStorageEngine } from './app-storage.engine'
import { GAMESTATES } from './states'
import { HandlerModule } from './handler.module'
import { NativeScriptModule } from 'nativescript-angular/nativescript.module'
import { NativeScriptUISideDrawerModule } from 'nativescript-ui-sidedrawer/angular'
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core'
import { NgxsModule } from '@ngxs/store'
import { NgxsResetPluginModule } from 'ngxs-reset-plugin'
import { NgxsStoragePluginModule, STORAGE_ENGINE } from '@ngxs/storage-plugin'
import { TickHandler } from './states/tick.handler'

@NgModule({
  bootstrap: [
    AppComponent,
  ],
  imports: [
    AppRoutingModule,
    NativeScriptModule,
    NativeScriptUISideDrawerModule,
    NgxsModule.forRoot(GAMESTATES, { developmentMode: true }),
    NgxsStoragePluginModule.forRoot(),
    NgxsResetPluginModule.forRoot(),
    HandlerModule.forRoot([TickHandler]),
  ],
  declarations: [
    AppComponent,
  ],
  providers: [{
    provide: STORAGE_ENGINE,
    useClass: AppStorageEngine
  }],
  schemas: [
    NO_ERRORS_SCHEMA,
  ]
})
export class AppModule { }
