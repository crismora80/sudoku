import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MODAL_ACTIONS } from './confirmation-modal.model';

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.scss'],
})
export class ConfirmationModalComponent implements OnInit {
  onConfirm = () => { }

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() { }

  cancel(): void {
    this.modalCtrl.dismiss(null, MODAL_ACTIONS.cancel);
  }

  confirm(): void {
    this.modalCtrl.dismiss(null, MODAL_ACTIONS.confirm);
  }

}
