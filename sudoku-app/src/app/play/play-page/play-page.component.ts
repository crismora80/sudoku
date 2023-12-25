import { Component, OnInit } from '@angular/core';
import { SudokuLogicService } from '../sudoku-logic/sudoku-logic.service';
import { SudokuTable } from '../table/table.mode';

@Component({
  selector: 'app-play-page',
  templateUrl: './play-page.component.html',
  styleUrls: ['./play-page.component.scss'],
})
export class PlayPageComponent implements OnInit {
  tableValues: SudokuTable = [];

  constructor(private sudokuLogicSvc: SudokuLogicService) { }

  ngOnInit() {
    this.tableValues = this.sudokuLogicSvc.generateEmptyTable();
  }

}
