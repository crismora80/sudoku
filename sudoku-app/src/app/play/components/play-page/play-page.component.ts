
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { SudokuLogicService } from '../../services/sudoku-logic/sudoku-logic.service';
import { DifficultyLevel, SudokuTable } from '../table/table.model';
import { TableMediatorService } from '../table/table.mediator.service';
import { ButtonIcon } from '../../../shared/button-icon/button-icon.module';
import { GameChooserService } from '../../services/game-chooser/game-chooser.service';
import { CanDeactivateComponent } from '../../guards/can.leave.page.guard';
import { AlertService } from '../../services/alert/alert.service';

@Component({
  selector: 'app-play-page',
  templateUrl: './play-page.component.html',
  styleUrls: ['./play-page.component.scss'],
})
export class PlayPageComponent implements OnInit, CanDeactivateComponent {
  sudokuTable: SudokuTable = [];
  difficultyLevel: DifficultyLevel = DifficultyLevel.Easy;
  loading?: HTMLIonLoadingElement;
  alertButtons = ['No', 'Yes'];

  ButtonIcon = ButtonIcon;

  constructor(
    private sudokuLogicSvc: SudokuLogicService,
    private route: ActivatedRoute,
    private router: Router,
    private tableMediatorSvc: TableMediatorService,
    private gameChooserSvc: GameChooserService,
    private alertSvc: AlertService
  ) { }

  ngOnInit() {
    this.sudokuTable = this.sudokuLogicSvc.generateEmptyTable();
    this.route.queryParams.subscribe((queryParams: Params) => {
      this.difficultyLevel = Number.parseInt(queryParams['difficulty']);
      this.getNewTable();
    })
  }

  async canDeactivate(): Promise<boolean> {
    if (this.sudokuLogicSvc.checkIfTableIsFullAndCorrect(this.sudokuTable)) {
      return true;
    }
    return this.alertSvc.showQuitAlert();
  }

  onResetClicked(): void {
    this.alertSvc.showResetAlert({ yes: this.onConfirmResetGameClicked.bind(this) })
  }

  async onKeyPressed(digit: string) {
    this.tableMediatorSvc.updateCell$.next(digit);
    if (this.sudokuLogicSvc.checkIfTableIsFullAndCorrect(this.sudokuTable)) {
      this.alertSvc.showWonGameAlert({ no: this.goBackToMainPage.bind(this), yes: this.onConfirmNewGameClicked.bind(this) });
    }
  }

  private goBackToMainPage(): void {
    this.router.navigateByUrl('');
  }

  private async getNewTable(): Promise<void> {
    this.gameChooserSvc.getGame(this.difficultyLevel).subscribe((sudokuTable: SudokuTable) => this.sudokuTable = sudokuTable);
    //this.gameChooserSvc.getDummyGame().subscribe((sudokuTable: SudokuTable) => this.sudokuTable = sudokuTable);
  }

  private onConfirmResetGameClicked(): void {
    this.sudokuLogicSvc.resetTable(this.sudokuTable);
  }

  private onConfirmNewGameClicked(): void {
    this.getNewTable();
  }
}
