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
}