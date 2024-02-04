import { Injectable } from "@angular/core";
import { AlertController } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core';

export interface AlertActions {
    no?: () => void,
    yes?: () => void
}

@Injectable()
export class AlertService {
    constructor(private alertCtrl: AlertController) { }

    async showQuitAlert(): Promise<boolean> {
        const alert = await this.alertCtrl.create({
            header: "Quit",
            message: "Are you sure you want to quit? The progress will be lost.",
            backdropDismiss: false,
            buttons: [
                {
                    text: 'No',
                    cssClass: 'secondary-btn',
                    handler: () => { }
                },
                {
                    text: 'Yes',
                    role: 'leave',
                    handler: () => { }
                }
            ]
        });
        alert.present();

        return new Promise<boolean>((resolve) => {
            alert.onDidDismiss().then((data: OverlayEventDetail) => {
                resolve(data.role === 'leave');
            });
        });
    }

    async showWonGameAlert(alertActions: AlertActions): Promise<void> {
        const alert = await this.alertCtrl.create({
            header: "Congratulations",
            message: "You solved the puzzle!",
            backdropDismiss: false,
            buttons: [
                {
                    text: 'Close',
                    cssClass: 'secondary-btn',
                    handler: alertActions.no
                },
                {
                    text: 'New game',
                    handler: alertActions.yes
                }
            ]
        });
        alert.present();
    }

    async showResetAlert(alertActions: AlertActions): Promise<void> {
        const alert = await this.alertCtrl.create({
            header: "Reset",
            message: "Are you sure you want to reset the current game?",
            backdropDismiss: false,
            buttons: [
                {
                    text: 'No',
                    cssClass: 'secondary-btn'
                },
                {
                    text: 'Yes',
                    handler: alertActions.yes
                }
            ]
        });
        alert.present();
    }
}