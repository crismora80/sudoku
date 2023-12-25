import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { PlayRoutingModule } from './play-routing.module';
import { PlayPageComponent } from './play-page/play-page.component';

@NgModule({
  declarations: [PlayPageComponent],
  imports: [
    CommonModule,
    IonicModule,
    PlayRoutingModule
  ]
})
export class PlayModule { }
