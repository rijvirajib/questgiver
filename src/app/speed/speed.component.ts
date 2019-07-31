import { Component, OnInit, Injectable } from '@angular/core'
import { Pause, ChangeSpeed } from '../states'
import { Store } from '@ngxs/store'

@Component({
    selector: 'speed-controls',
    templateUrl: './speed.component.html',
    styleUrls: ['./speed.component.css']
})

export class SpeedComponent implements OnInit {

  constructor(private store: Store) {}

  ngOnInit() {
    // Nothing
  }

  onPause(event: any) {
    this.store.dispatch(new Pause())
  }

  onPlay(event: any) {
    this.store.dispatch(new ChangeSpeed(1))
  }

  onSpeed(event: any) {
    this.store.dispatch(new ChangeSpeed(8))
  }
}
