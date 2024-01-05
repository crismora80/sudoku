import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { PlayRoutingModule } from './play-routing.module';
import { PlayPageComponent } from './play-page/play-page.component';
import { TableComponent } from './table/table.component';
import { TileComponent } from './tile/tile.component';
import { SudokuLogicService } from './sudoku-logic/sudoku-logic.service';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [PlayPageComponent, TableComponent, TileComponent],
  imports: [
    CommonModule,
    IonicModule,
    PlayRoutingModule,
    FormsModule,
    SharedModule,
  ],
  providers: [SudokuLogicService]
})
export class PlayModule { }
