import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { OnScreenKeyboardComponent } from './components/on-screen-keyboard/on-screen-keyboard.component';
import { PlayRoutingModule } from './play-routing.module';
import { PlayPageComponent } from './play-page/play-page.component';
import { TableComponent } from './table/table.component';
import { TileComponent } from './tile/tile.component';
import { SudokuLogicService } from './sudoku-logic/sudoku-logic.service';
import { SharedModule } from '../shared/shared.module';
import { GamesFileParserService } from './games-file-parser/games-file-parser.service';
import { GameChooserService } from './game-chooser/game-chooser.service';

@NgModule({
  declarations: [OnScreenKeyboardComponent, PlayPageComponent, TableComponent, TileComponent],
  imports: [
    CommonModule,
    IonicModule,
    PlayRoutingModule,
    FormsModule,
    SharedModule,
    HttpClientModule
  ],
  providers: [SudokuLogicService, GamesFileParserService, GameChooserService]
})
export class PlayModule { }
