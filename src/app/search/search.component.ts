import { Component, OnInit } from '@angular/core'
import { RadSideDrawer } from 'nativescript-ui-sidedrawer'
import * as app from 'tns-core-modules/application'

@Component({
    selector: 'Search',
    moduleId: module.id,
    templateUrl: './search.component.html'
})
export class SearchComponent implements OnInit {

    constructor() {
        // Use the component constructor to inject providers.
    }

    ngOnInit(): void {
        // Init your component properties here.
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView()
        sideDrawer.showDrawer()
    }
}
