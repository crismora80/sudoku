import { Component, OnInit } from '@angular/core';
import { TableValues, TileValue } from './table.mode';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  indexes: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  tableValues: TableValues = [];

  constructor() { }

  ngOnInit() {
    this.initializeTableValues();
  }

  private initializeTableValues(): void {
    for (let i = 0; i < 9; i++) {
      this.tableValues[i] = [];
      for (let j = 0; j < 9; j++) {
        this.tableValues[i][j] = { isFixed: false };
      }
    }
  }

}
