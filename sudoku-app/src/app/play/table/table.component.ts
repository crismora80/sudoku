import { Component, Input, OnInit } from '@angular/core';
import { SudokuTable, TileValue } from './table.model';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  @Input() tableValues: SudokuTable = [];

  indexes: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8];

  constructor() { }

  ngOnInit() {
  }
}
