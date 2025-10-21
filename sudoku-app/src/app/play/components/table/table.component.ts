import { OnDestroy } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { Component, Input, OnInit } from '@angular/core';
import { findIndex, Subject, takeUntil } from 'rxjs';
import { TableMediatorService } from './table.mediator.service';

import { SudokuTable } from './table.model';
import { SudokuLogicService } from '../../services/sudoku-logic/sudoku-logic.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit, OnDestroy {
  @Input() sudokuTable: SudokuTable = [];
  @Output() valueChanged = new EventEmitter<void>();

  selectedX = -1;
  selectedY = -1;

  indexes: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8];

  isInEditMode = false;

  private destroy$ = new Subject<void>();

  constructor(private tableMediatorSvc: TableMediatorService, private sudokuLogicService: SudokuLogicService) { }

  ngOnInit() {
    this.tableMediatorSvc.updateCell$.pipe(takeUntil(this.destroy$)).subscribe((value: string) => {
      if (this.selectedX >= 0 && this.selectedY >= 0) {
        var cell = this.sudokuTable[this.selectedX][this.selectedY];
        if (!this.isInEditMode) {
          cell.value = value;
          cell.values = [];
        }
        else {
          if (cell.values) {
            if (value === '') {
              cell.values = [];
            } else {
              if (cell.values.findIndex(x => x === value) === -1) {
                cell.values.push(value);
              }
            }
          } else {
            cell.values = [value];
          }
          if (cell.value) {
            cell.values.push(cell.value);
          }
          cell.value = '';
        }
        this.sudokuLogicService.validateAllCells(this.sudokuTable);
      }
    });

    this.tableMediatorSvc.toggleEditMode$.pipe(takeUntil(this.destroy$)).subscribe((editMode: boolean) => {
      this.isInEditMode = editMode;
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onTileClicked(x: number, y: number): void {
    this.selectedX = x;
    this.selectedY = y;
  }
}
