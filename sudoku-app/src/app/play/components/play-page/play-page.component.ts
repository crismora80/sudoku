
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { SudokuLogicService } from '../../services/sudoku-logic/sudoku-logic.service';
import { DifficultyLevel, SudokuTable } from '../table/table.model';
import { TableMediatorService } from '../table/table.mediator.service';
import { ButtonIcon } from '../../../shared/button-icon/button-icon.module';
import { GameChooserService } from '../../services/game-chooser/game-chooser.service';

@Component({
  selector: 'app-play-page',
  templateUrl: './play-page.component.html',
  styleUrls: ['./play-page.component.scss'],
})
export class PlayPageComponent implements OnInit {
  sudokuTable: SudokuTable = [];
  difficultyLevel: DifficultyLevel = DifficultyLevel.Easy;
  loading?: HTMLIonLoadingElement;

  ButtonIcon = ButtonIcon;

  constructor(
    private sudokuLogicSvc: SudokuLogicService,
    private route: ActivatedRoute,
    private tableMediatorSvc: TableMediatorService,
    private gameChooserSvc: GameChooserService
  ) { }

  ngOnInit() {
    this.sudokuTable = this.sudokuLogicSvc.generateEmptyTable();
    this.route.queryParams.subscribe((queryParams: Params) => {
      this.difficultyLevel = Number.parseInt(queryParams['difficulty']);
      this.getNewTable();
    })
  }

  onNewGameBtnClicked(): void {
    this.getNewTable();
  }

  onResetGame(): void {
    this.sudokuLogicSvc.resetTable(this.sudokuTable);
  }

  onKeyPressed(digit: string) {
    this.tableMediatorSvc.updateCell$.next(digit);
    // if (this.sudokuLogicSvc.checkIfTableIsFull(this.sudokuTable) && this.sudokuLogicSvc.checkIfTableIsCorrect(this.sudokuTable)) {
    //   alert('Correct!')
    // }
  }

  private async getNewTable(): Promise<void> {
    this.gameChooserSvc.getGame(this.difficultyLevel).subscribe((sudokuTable: SudokuTable) => this.sudokuTable = sudokuTable);
  }
}
