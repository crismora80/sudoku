import { Injectable } from "@angular/core";

import { SudokuTable, DifficultyLevel } from '../../components/table/table.model';

@Injectable()
export class SudokuLogicService {
    generateEmptyTable(): SudokuTable {
        const sudokuTable: SudokuTable = [];
        for (let i = 0; i < 9; i++) {
            sudokuTable[i] = [];
            for (let j = 0; j < 9; j++) {
                sudokuTable[i][j] = { isFixed: true };
            }
        }
        return sudokuTable;
    }

    resetTable(sudokuTable: SudokuTable): void {
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                if (!sudokuTable[i][j].isFixed)
                    sudokuTable[i][j].value = undefined;
            }
        }
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

    chooseRandomFullCellPosition(sudokuTable: SudokuTable): [number, number] {
        if (this.checkIfTableIsEmpty(sudokuTable)) {
            return [-1, -1];
        }

        let i = Math.floor(Math.random() * 9);
        let j = Math.floor(Math.random() * 9);
        while (!sudokuTable[i][j].value) {
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

        this.DFS_solve(sudokuTable, solutions);

        return solutions;
    }

    generateSudoku(difficultyLevel: DifficultyLevel): SudokuTable {
        const sudokuTable = this.generateEmptyTable();
        const solutions: SudokuTable[] = [];
        this.DFS_solve(sudokuTable, solutions, 0, 0, 1);
        const completeSudokuTable = solutions[0];
        let noToRemove = 0;
        switch (difficultyLevel) {
            case DifficultyLevel.Easy:
                // [42, 46]
                noToRemove = Math.floor(Math.random() * 5) + 42;
                break;
            case DifficultyLevel.Medium:
                // [44, 48]
                noToRemove = Math.floor(Math.random() * 5) + 44;
                break;
            case DifficultyLevel.Hard:
                // [51, 53]
                noToRemove = Math.floor(Math.random() * 3) + 51;
                break;
        }
        this.DFS_remove(completeSudokuTable, noToRemove);
        return completeSudokuTable;
    }

    private DFS_solve(sudokuTable: SudokuTable, result: SudokuTable[], i = 0, j = 0, maxNoOfSolutions = 2): void {
        if (result.length < maxNoOfSolutions) {
            let possibleValues = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];

            if (!sudokuTable[i][j].value) {
                while (possibleValues.length > 0) {
                    let x = possibleValues[Math.floor(Math.random() * possibleValues.length)]
                    possibleValues = possibleValues.filter(y => y !== x);
                    sudokuTable[i][j].value = x;
                    if (this.checkIfTableIsCorrect(sudokuTable)) {
                        if (this.checkIfTableIsFull(sudokuTable)) {
                            result.push(structuredClone(sudokuTable));
                        } else {
                            if (j < 8) {
                                this.DFS_solve(sudokuTable, result, i, j + 1, maxNoOfSolutions);
                            } else {
                                if (i < 8) {
                                    this.DFS_solve(sudokuTable, result, i + 1, 0, maxNoOfSolutions);
                                }
                            }
                        }
                    }
                }
                sudokuTable[i][j].value = undefined;
            } else {
                if (j < 8) {
                    this.DFS_solve(sudokuTable, result, i, j + 1, maxNoOfSolutions);
                } else {
                    if (i < 8) {
                        this.DFS_solve(sudokuTable, result, i + 1, 0, maxNoOfSolutions);
                    }
                }
            }

        }
    }

    private DFS_remove(sudokuTable: SudokuTable, noToRemove: number, noOfRemoved = 0): void {
        if (noOfRemoved < noToRemove) {
            const solutions: SudokuTable[] = [];

            let [i, j] = this.chooseRandomFullCellPosition(sudokuTable);
            let valueToBeRemoved = sudokuTable[i][j].value;
            sudokuTable[i][j].value = undefined;
            sudokuTable[i][j].isFixed = false;
            this.DFS_solve(sudokuTable, solutions);

            while (solutions.length > 1) {
                solutions.length = 0;
                sudokuTable[i][j].value = valueToBeRemoved;
                sudokuTable[i][j].isFixed = true;

                [i, j] = this.chooseRandomFullCellPosition(sudokuTable);
                valueToBeRemoved = sudokuTable[i][j].value;
                sudokuTable[i][j].value = undefined;
                sudokuTable[i][j].isFixed = false;
                this.DFS_solve(sudokuTable, solutions);
            }

            this.DFS_remove(sudokuTable, noToRemove, noOfRemoved + 1);
        }
    }

    private checkIfTableIsEmpty(sudokuTable: SudokuTable): boolean {
        const fullTile = sudokuTable.find(row => row.find(cell => cell.value));
        return !fullTile;
    }
}