import { NgModule } from '@angular/core'
import { Routes } from '@angular/router'
import { NativeScriptRouterModule } from 'nativescript-angular/router'

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', loadChildren: '~/app/home/home.module#HomeModule' },
  { path: 'missions', loadChildren: '~/app/missions/missions.module#MissionsModule' },
  { path: 'inventory', loadChildren: '~/app/inventory/inventory.module#InventoryModule' },
  { path: 'featured', loadChildren: '~/app/featured/featured.module#FeaturedModule' },
  { path: 'settings', loadChildren: '~/app/settings/settings.module#SettingsModule' },
]

@NgModule({
  imports: [NativeScriptRouterModule.forRoot(routes)],
  exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
