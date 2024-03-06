import { Component, ViewChild } from '@angular/core';
import { ScreenOrientation, OrientationType } from '@capawesome/capacitor-screen-orientation';
import { IonRouterOutlet, Platform } from '@ionic/angular';
import { App } from '@capacitor/app';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  @ViewChild(IonRouterOutlet) routerOutlet!: IonRouterOutlet;

  constructor(private platform: Platform) {
    ScreenOrientation.lock({ type: OrientationType.PORTRAIT });
    this.platform.backButton.subscribeWithPriority(-1, () => {
      if (!this.routerOutlet?.canGoBack()) {
        App.exitApp();
      }
    });
  }
}
