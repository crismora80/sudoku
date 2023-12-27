import { ThisReceiver } from "@angular/compiler";
import { Injectable } from "@angular/core";

import { SudokuTable, TileValue } from '../table/table.model';

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
        const emptyTile = sudokuTable.find(row => row.find(cell => !cell.value));
        return !emptyTile;
    }

    checkIfTableIsCorrect(sudokuTable: SudokuTable): boolean {
        // check if rows have duplicates
        for (let i = 0; i < 9; i++) {
            const definedValuesInRow = sudokuTable[i].filter(cell => !!cell.value).map(cell => cell.value);
            if ((new Set(definedValuesInRow)).size !== definedValuesInRow.length) {
                return false;
            }
        }

        // check if columns have duplicates 
        for (let j = 0; j < 9; j++) {
            const definedValuesInColumn = [];
            for (let i = 0; i < 9; i++) {
                if (!!sudokuTable[i][j].value) {
                    definedValuesInColumn.push(sudokuTable[i][j].value)
                }
            }
            if ((new Set(definedValuesInColumn)).size !== definedValuesInColumn.length) {
                return false;
            }
        }

        // check if 3x3 squares have duplicate elements
        for (let k = 0; k < 3; k++) {
            for (let l = 0; l < 3; l++) {
                const definedValuesInSquare = [];
                for (let i = k * 3; i < (k + 1) * 3; i++) {
                    for (let j = l * 3; j < (l + 1) * 3; j++) {
                        if (!!sudokuTable[i][j].value) {
                            definedValuesInSquare.push(sudokuTable[i][j].value)
                        }
                    }
                }
                if ((new Set(definedValuesInSquare)).size !== definedValuesInSquare.length) {
                    return false;
                }
            }
        }

        return true;
    }

    chooseRandomEmptyCellPosition(sudokuTable: SudokuTable): [number, number] {
        if (this.checkIfTableIsFull(sudokuTable)) {
            return [-1, -1];
        }

        let i = Math.floor(Math.random() * 9);
        let j = Math.floor(Math.random() * 9);
        while (!!sudokuTable[i][j].value) {
            i = Math.floor(Math.random() * 9);
            j = Math.floor(Math.random() * 9);
        }

        return [i, j];
    }

    solveSudoku(sudokuTable: SudokuTable): SudokuTable[] {
        const solutions: SudokuTable[] = [];

        if (!this.checkIfTableIsCorrect(sudokuTable)) {
            return [];
        }
        if (this.checkIfTableIsFull(sudokuTable)) {
            return [sudokuTable];
        }

        this.DFS(sudokuTable, solutions);

        return solutions;
    }



    private DFS(sudokuTable: SudokuTable, result: SudokuTable[], i = 0, j = 0): void {
        if (result.length < 2) {
            let possibleValues = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];

            if (!sudokuTable[i][j].value) {
                possibleValues.forEach(x => {
                    sudokuTable[i][j].value = x;
                    if (this.checkIfTableIsCorrect(sudokuTable)) {
                        if (this.checkIfTableIsFull(sudokuTable)) {
                            result.push(structuredClone(sudokuTable));
                        } else {
                            if (j < 8) {
                                this.DFS(sudokuTable, result, i, j + 1);
                            } else {
                                if (i < 8) {
                                    this.DFS(sudokuTable, result, i + 1, 0);
                                }
                            }
                        }
                    }
                })
                sudokuTable[i][j].value = undefined;
            } else {
                if (j < 8) {
                    this.DFS(sudokuTable, result, i, j + 1);
                } else {
                    if (i < 8) {
                        this.DFS(sudokuTable, result, i + 1, 0);
                    }
                }
            }

        }
    }
}