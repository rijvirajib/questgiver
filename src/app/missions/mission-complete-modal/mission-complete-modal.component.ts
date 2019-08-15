import { ActivatedRoute } from '@angular/router'
import { Component, OnInit } from '@angular/core'
import { MissionModel, MISSION_STATUS } from '~/app/models/mission.model'
import { ModalDialogParams } from 'nativescript-angular/modal-dialog'
import { ModalStack, overrideModalViewMethod } from 'nativescript-windowed-modal'
import { Page } from 'tns-core-modules/ui/page'
import { RouterExtensions } from 'nativescript-angular/router'
import { registerElement } from 'nativescript-angular'
registerElement('ModalStack', () => ModalStack)

@Component({
  moduleId: module.id,
  selector: 'ns-mission-complete-modal',
  templateUrl: './mission-complete-modal.component.html',
  styleUrls: ['./mission-complete-modal.component.scss']
})

export class MissionCompleteModalComponent implements OnInit {
  mission: MissionModel
  isMissionSuccess: boolean

  constructor(private params: ModalDialogParams, private page: Page, private router: RouterExtensions, private activeRoute: ActivatedRoute) {
    overrideModalViewMethod()
  }

  ngOnInit() {
    this.mission = this.params.context.mission
    this.isMissionSuccess = this.mission.status === MISSION_STATUS.SUCCESS
  }

  onClose() {
    this.params.closeCallback('return value')
  }
}
