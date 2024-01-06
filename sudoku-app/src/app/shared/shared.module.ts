import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { ButtonTextComponent } from './button-text/button-text/button-text.component';
import { ButtonIconComponent } from './button-icon/button-icon.component';

@NgModule({
    declarations: [ButtonTextComponent, ButtonIconComponent],
    imports: [
        CommonModule,
        IonicModule
    ],
    exports: [ButtonTextComponent, ButtonIconComponent]
})
export class SharedModule { }
