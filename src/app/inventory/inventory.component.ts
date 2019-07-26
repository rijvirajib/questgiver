import * as app from 'tns-core-modules/application'
import { ActivatedRoute } from '@angular/router'
import { Component, OnInit } from '@angular/core'
import { EquipNPC, UnequipNPC } from '../states'
import { ItemModel } from '../models/item.model'
import { MissionModel } from '../models/mission.model'
import { MissionsState } from '../states/missions/missions.state'
import { NPCModel } from '../models/npc.model'
import { Observable } from 'rxjs/internal/Observable'
import { RadSideDrawer } from 'nativescript-ui-sidedrawer'
import { RouterExtensions } from 'nativescript-angular/router'
import { Store } from '@ngxs/store'
import { map } from 'rxjs/internal/operators/map'
@Component({
  selector: 'ns-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})

export class InventoryComponent implements OnInit {
  missionId: string
  npcId: string
  equipClass: string
  activeMission: MissionModel
  activeNPC$: Observable<NPCModel>

  inventoryItems$: Observable<Array<ItemModel>>

  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private routerExtensions: RouterExtensions
  ) {
    // Use the component constructor to inject providers.
  }

  ngOnInit(): void {
    // We have query params to filter, otherwise all inventory items
    this.route.queryParams.subscribe(params => {
      this.missionId = params.missionId
      this.npcId = params.npcId
      this.equipClass = params.equipClass
      this.inventoryItems$ = this.store.select(MissionsState.inventoryItems).pipe(map(filterFn => filterFn(this.equipClass)))
      if (this.missionId) {
        this.store.select(MissionsState.missionById).subscribe(fn => {
          this.activeMission = fn(this.missionId)
        })
      }
      if (this.npcId) {
        this.activeNPC$ = this.store.select(MissionsState.crewById).pipe(map(filterFn => filterFn(this.missionId, this.npcId)))
      }
    })
  }

  onDrawerButtonTap() {
    const sideDrawer = <RadSideDrawer>app.getRootView()
    sideDrawer.showDrawer()
    // this.routerExtensions.back()
  }

  onBack() {
    // TODO: Go back is breaking...
    // this.routerExtensions.backToPreviousPage()
  }

  onTapItem(itemId: string) {
    this.store.dispatch(new EquipNPC(this.missionId, this.npcId, itemId))
  }

  onTapUnequip(itemId: string) {
    this.store.dispatch(new UnequipNPC(this.missionId, this.npcId, itemId))
  }
}
