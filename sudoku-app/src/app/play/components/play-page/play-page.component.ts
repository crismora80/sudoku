
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

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
  alertButtons = ['No', 'Yes'];

  ButtonIcon = ButtonIcon;

  constructor(
    private sudokuLogicSvc: SudokuLogicService,
    private route: ActivatedRoute,
    private router: Router,
    private tableMediatorSvc: TableMediatorService,
    private gameChooserSvc: GameChooserService,
    private alertController: AlertController
  ) { }

  ngOnInit() {
    this.sudokuTable = this.sudokuLogicSvc.generateEmptyTable();
    this.route.queryParams.subscribe((queryParams: Params) => {
      this.difficultyLevel = Number.parseInt(queryParams['difficulty']);
      this.getNewTable();
    })
  }

  onConfirmNewGameClicked(): void {
    this.getNewTable();
  }

  onConfirmResetGameClicked(): void {
    this.sudokuLogicSvc.resetTable(this.sudokuTable);
  }

  async onKeyPressed(digit: string) {
    this.tableMediatorSvc.updateCell$.next(digit);
    if (this.sudokuLogicSvc.checkIfTableIsFull(this.sudokuTable) && this.sudokuLogicSvc.checkIfTableIsCorrect(this.sudokuTable)) {
      const alert = await this.alertController.create({
        header: "Congratulations",
        message: "You solved the puzzle!",
        buttons: [
          {
            text: 'Close',
            handler: this.goBackToMainPage.bind(this)
          },
          {
            text: 'Start new game',
            handler: this.onConfirmNewGameClicked.bind(this)
          }]
      });
      alert.present();
    }
  }

  private goBackToMainPage(): void {
    this.router.navigateByUrl('');
  }

  private async getNewTable(): Promise<void> {
    this.gameChooserSvc.getGame(this.difficultyLevel).subscribe((sudokuTable: SudokuTable) => this.sudokuTable = sudokuTable);
    // this.gameChooserSvc.getDummyGame().subscribe((sudokuTable: SudokuTable) => this.sudokuTable = sudokuTable);
  }
}
