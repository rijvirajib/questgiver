import { Actions, ofActionCompleted, Store } from '@ngxs/store'
import { CaseMissions } from './missions/missions.actions'
import { Injectable } from '@angular/core'
import { Tick } from './game.actions'

@Injectable()
export class TickHandler {
  constructor(private store: Store, private actions$: Actions) {
    this.actions$
    .pipe(ofActionCompleted(Tick))
    .subscribe(() => {
      this.caseMissions()
    })
  }

  caseMissions() {
    this.store.dispatch(new CaseMissions())
  }
}
