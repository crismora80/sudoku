import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { OnScreenKeyboardComponent } from './components/on-screen-keyboard/on-screen-keyboard.component';
import { PlayRoutingModule } from './play-routing.module';
import { PlayPageComponent } from './components/play-page/play-page.component';
import { TableComponent } from './components/table/table.component';
import { TileComponent } from './components/tile/tile.component';
import { SudokuLogicService } from './services/sudoku-logic/sudoku-logic.service';
import { SharedModule } from '../shared/shared.module';
import { GamesFileParserService } from './services/games-file-parser/games-file-parser.service';
import { GameChooserService } from './services/game-chooser/game-chooser.service';
import { CanDeactivateGuard } from './guards/can.leave.page.guard';
import { AlertService } from './services/alert/alert.service';

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
  providers: [SudokuLogicService, GamesFileParserService, GameChooserService, AlertService, CanDeactivateGuard]
})
export class PlayModule { }
