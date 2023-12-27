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
  tableValues: SudokuTable = [];
  difficultyLevel: DifficultyLevel = DifficultyLevel.Easy;

  constructor(private sudokuLogicSvc: SudokuLogicService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.tableValues = this.sudokuLogicSvc.generateEmptyTable();
    this.route.queryParams.subscribe((queryParams: Params) => {
      this.difficultyLevel = Number.parseInt(queryParams['difficulty']);
      this.generateNewTable();
    })
  }

  onNewGameBtnClicked(): void {
    this.generateNewTable();
  }

  private generateNewTable(): void {
    this.tableValues = this.sudokuLogicSvc.generateSudoku(this.difficultyLevel);
  }
}
