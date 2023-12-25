import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { PlayRoutingModule } from './play-routing.module';
import { PlayPageComponent } from './play-page/play-page.component';
import { TableComponent } from './table/table.component';
import { TileComponent } from './tile/tile.component';
import { FormsModule } from '@angular/forms';
import { SudokuLogicService } from './sudoku-logic/sudoku-logic.service';

@NgModule({
  declarations: [PlayPageComponent, TableComponent, TileComponent],
  imports: [
    CommonModule,
    IonicModule,
    PlayRoutingModule,
    FormsModule
  ],
  providers: [SudokuLogicService]
})
export class PlayModule { }
