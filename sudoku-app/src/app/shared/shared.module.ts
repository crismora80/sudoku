import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { ButtonTextComponent } from './button-text/button-text/button-text.component';

@NgModule({
    declarations: [ButtonTextComponent],
    imports: [
        CommonModule,
        IonicModule
    ],
    exports: [ButtonTextComponent]
})
export class SharedModule { }
