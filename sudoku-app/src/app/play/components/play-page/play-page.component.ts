
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core';

import { SudokuLogicService } from '../../services/sudoku-logic/sudoku-logic.service';
import { DifficultyLevel, SudokuTable } from '../table/table.model';
import { TableMediatorService } from '../table/table.mediator.service';
import { ButtonIcon } from '../../../shared/button-icon/button-icon.module';
import { GameChooserService } from '../../services/game-chooser/game-chooser.service';
import { CanDeactivateComponent } from '../../guards/can.leave.page.guard';

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

  async canDeactivate(): Promise<boolean> {
    const alert = await this.alertController.create({
      header: "Quit",
      message: "Are you sure you want to quit? The progress will be lost.",
      backdropDismiss: false,
      buttons: [
        {
          text: 'No',
          cssClass: 'secondary-btn',
          handler: () => { }
        },
        {
          text: 'Yes',
          role: 'leave',
          handler: () => { }
        }
      ]
    });
    alert.present();

    return new Promise<boolean>((resolve) => {
      alert.onDidDismiss().then((data: OverlayEventDetail) => {
        resolve(data.role === 'leave');
      });
    });
  }

  async onKeyPressed(digit: string) {
    this.tableMediatorSvc.updateCell$.next(digit);
    if (this.sudokuLogicSvc.checkIfTableIsFull(this.sudokuTable) && this.sudokuLogicSvc.checkIfTableIsCorrect(this.sudokuTable)) {
      const alert = await this.alertController.create({
        header: "Congratulations",
        message: "You solved the puzzle!",
        backdropDismiss: false,
        buttons: [
          {
            text: 'Close',
            cssClass: 'secondary-btn',
            handler: this.goBackToMainPage.bind(this)
          },
          {
            text: 'New game',
            handler: this.onConfirmNewGameClicked.bind(this)
          }
        ]
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
