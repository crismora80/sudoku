import { Injectable } from "@angular/core";

import { SudokuTable } from '../table/table.mode';

@Injectable()
export class SudokuLogicService {
    generateEmptyTable(): SudokuTable {
        const tableValues: SudokuTable = [];
        for (let i = 0; i < 9; i++) {
            tableValues[i] = [];
            for (let j = 0; j < 9; j++) {
                tableValues[i][j] = { isFixed: false };
            }
        }
        return tableValues;
    }

    generatePossibleGame(): SudokuTable {
        const sudokuTable = this.generateEmptyTable();
        sudokuTable[2][2] = { value: "5", isFixed: true };
        sudokuTable[5][6] = { value: "1", isFixed: false }
        return sudokuTable;
    }

    checkIfTableIsFull(sudokuTable: SudokuTable): boolean {
        const emptyTile = sudokuTable.find(row => {
            row.find(cell => {
                !cell.value
            })
        });
        return !emptyTile;
    }
}