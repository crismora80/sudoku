import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { SudokuLogicService } from '../sudoku-logic/sudoku-logic.service';
import { DifficultyLevel, SudokuTable } from '../table/table.model';

@Component({
  selector: 'app-play-page',
  templateUrl: './play-page.component.html',
  styleUrls: ['./play-page.component.scss'],
})
export class PlayPageComponent implements OnInit {
  sudokuTable: SudokuTable = [];
  difficultyLevel: DifficultyLevel = DifficultyLevel.Easy;

  constructor(private sudokuLogicSvc: SudokuLogicService, private route: ActivatedRoute) { }

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

  onValueChanged(): void {
    if (this.sudokuLogicSvc.checkIfTableIsFull(this.sudokuTable) && this.sudokuLogicSvc.checkIfTableIsCorrect(this.sudokuTable)) {
      alert('Correct!')
    }
  }

  private generateNewTable(): void {
    this.sudokuTable = this.sudokuLogicSvc.generateSudoku(this.difficultyLevel);
  }
}
