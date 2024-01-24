import { OnDestroy } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { Component, Input, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { TableMediatorService } from './table.mediator.service';

import { SudokuTable, TileValue } from './table.model';
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

  private destroy$ = new Subject<void>();

  constructor(private tableMediatorSvc: TableMediatorService, private sudokuLogicService: SudokuLogicService) { }

  ngOnInit() {
    this.tableMediatorSvc.updateCell$.pipe(takeUntil(this.destroy$)).subscribe((value: string) => {
      if (this.selectedX >= 0 && this.selectedY >= 0) {
        this.sudokuTable[this.selectedX][this.selectedY].value = value;
        this.sudokuTable[this.selectedX][this.selectedY].isWrong = !this.sudokuLogicService.checkIfCellIsCorrect(this.sudokuTable, this.selectedX, this.selectedY)
      }
    })
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onValueChanged(): void {
    this.valueChanged.emit();
  }

  onTileClicked(x: number, y: number): void {
    this.selectedX = x;
    this.selectedY = y;
  }
}
