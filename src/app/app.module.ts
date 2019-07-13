import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptModule } from 'nativescript-angular/nativescript.module';
import { NativeScriptUISideDrawerModule } from 'nativescript-ui-sidedrawer/angular';
import { NgxsModule } from '@ngxs/store';
import { NgxsStoragePluginModule, STORAGE_ENGINE } from '@ngxs/storage-plugin';
import { AppStorageEngine } from './app-storage.engine';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  bootstrap: [
    AppComponent
  ],
  imports: [
    AppRoutingModule,
    NativeScriptModule,
    NativeScriptUISideDrawerModule,
    NgxsModule.forRoot([]),
    NgxsStoragePluginModule.forRoot()
  ],
  declarations: [
    AppComponent
  ],
  providers: [
    {
      provide: STORAGE_ENGINE,
      useClass: AppStorageEngine
    }
  ],
  schemas: [
    NO_ERRORS_SCHEMA
  ]
})
export class AppModule { }
