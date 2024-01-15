import { ChangeDetectorRef } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { SudokuLogicService } from '../sudoku-logic/sudoku-logic.service';
import { DifficultyLevel, SudokuTable } from '../table/table.model';
import { LoadingController } from '@ionic/angular';
import { TableMediatorService } from '../table/table.mediator.service';
import { ButtonIcon } from './../../shared/button-icon/button-icon.module';

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
    private loadingCtrl: LoadingController,
    private tableMediatorSvc: TableMediatorService
  ) { }

  ngOnInit() {
    this.sudokuTable = this.sudokuLogicSvc.generateEmptyTable();
    this.route.queryParams.subscribe((queryParams: Params) => {
      this.difficultyLevel = Number.parseInt(queryParams['difficulty']);
      this.generateNewTable();
    })
  }

  onNewGameBtnClicked(): void {
    this.generateNewTable();
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

  private async generateNewTable(): Promise<void> {
    await this.showLoadingPopup();

    this.sudokuTable = this.sudokuLogicSvc.generateSudoku(this.difficultyLevel);

    if (this.loading) {
      this.loading.dismiss();
    }
  }

  private async showLoadingPopup(): Promise<void> {
    this.loading = await this.loadingCtrl.create({
      message: 'Loading...'
    });

    if (this.loading) {
      return this.loading.present();
    }
    return new Promise<void>(() => { });
  }

}
