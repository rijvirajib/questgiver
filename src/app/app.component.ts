import * as app from 'tns-core-modules/application'
import { Component, OnInit } from '@angular/core'
import { DrawerTransitionBase, RadSideDrawer, SlideInOnTopTransition } from 'nativescript-ui-sidedrawer'
import { NavigationEnd, Router } from '@angular/router'
import { RouterExtensions } from 'nativescript-angular/router'
import { Start, LoadMissions } from './states'
import { StateClear, StateResetAll } from 'ngxs-reset-plugin'
import { Store } from '@ngxs/store'
import { filter } from 'rxjs/operators'

@Component({
  moduleId: module.id,
  selector: 'ns-app',
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit {
  private _activatedUrl: string
  private _sideDrawerTransition: DrawerTransitionBase

  constructor(
    private router: Router,
    private routerExtensions: RouterExtensions,
    private store: Store
  ) {

  }

  ngOnInit(): void {
    this._activatedUrl = '/home'
    this._sideDrawerTransition = new SlideInOnTopTransition()

    this.router.events
    .pipe(filter(e => e instanceof NavigationEnd))
    .subscribe((event: NavigationEnd) => this._activatedUrl = event.urlAfterRedirects)

    // Use the component constructor to inject services.
    setTimeout(() => {
      this.store.dispatch(Start)
      this.store.dispatch(LoadMissions)
    }, 100)
  }

  get sideDrawerTransition(): DrawerTransitionBase {
    return this._sideDrawerTransition
  }

  isComponentSelected(url: string): boolean {
    return this._activatedUrl === url
  }

  onNavItemTap(navItemRoute: string): void {
    this.routerExtensions.navigate([navItemRoute], {
      transition: {
        name: 'fade'
      }
    })

    const sideDrawer = <RadSideDrawer>app.getRootView()
    sideDrawer.closeDrawer()
  }
}
