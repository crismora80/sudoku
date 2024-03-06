import { Injectable } from "@angular/core";

import { SudokuTable, DifficultyLevel } from '../../components/table/table.model';

@Injectable()
export class SudokuLogicService {
    generateEmptyTable(): SudokuTable {
        const sudokuTable: SudokuTable = [];
        for (let i = 0; i < 9; i++) {
            sudokuTable[i] = [];
            for (let j = 0; j < 9; j++) {
                sudokuTable[i][j] = { isFixed: true, isWrong: false };
            }
        }
        return sudokuTable;
    }

    resetTable(sudokuTable: SudokuTable): void {
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                if (!sudokuTable[i][j].isFixed) {
                    sudokuTable[i][j].value = undefined;
                    sudokuTable[i][j].isWrong = false;
                }
            }
        }
    }

    checkIfTableIsFull(sudokuTable: SudokuTable): boolean {
        const emptyTile = sudokuTable.find(row => row.find(cell => !cell.value));
        return !emptyTile;
    }

    checkIfTableIsCorrect(sudokuTable: SudokuTable): boolean {
        for (let i = 0; i < 9; i++) {
            if (!this.checkIfRowIsCorrect(sudokuTable, i)) {
                return false;
            }
        }

        for (let j = 0; j < 9; j++) {
            if (!this.checkIfColumnIsCorrect(sudokuTable, j)) {
                return false;
            }
        }

        for (let k = 0; k < 3; k++) {
            for (let l = 0; l < 3; l++) {
                if (!this.checkIfSquareIsCorrect(sudokuTable, k, l)) {
                    return false;
                }
            }
        }

        return true;
    }

    checkIfTableIsFullAndCorrect(sudokuTable: SudokuTable): boolean {
        return this.checkIfTableIsFull(sudokuTable) && this.checkIfTableIsCorrect(sudokuTable);
    }

    validateAllCells(sudokuTable: SudokuTable): void {
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                if (!!sudokuTable[i][j].value) {
                    sudokuTable[i][j].isWrong = !this.checkIfCellIsCorrect(sudokuTable, i, j);
                } else {
                    sudokuTable[i][j].isWrong = false;
                }
            }
        }
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
                // [39, 42]
                noToRemove = Math.floor(Math.random() * 4) + 39;
                break;
            case DifficultyLevel.Medium:
                // [44, 47]
                noToRemove = Math.floor(Math.random() * 4) + 44;
                break;
            case DifficultyLevel.Hard:
                // [50, 53]
                noToRemove = Math.floor(Math.random() * 4) + 50;
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

    private checkIfRowIsCorrect(sudokuTable: SudokuTable, row: number): boolean {
        const definedValuesInRow = sudokuTable[row].filter(cell => !!cell.value).map(cell => cell.value);
        if ((new Set(definedValuesInRow)).size !== definedValuesInRow.length) {
            return false;
        }
        return true;
    }

    private checkIfColumnIsCorrect(sudokuTable: SudokuTable, column: number): boolean {
        const definedValuesInColumn = [];
        for (let i = 0; i < 9; i++) {
            if (!!sudokuTable[i][column].value) {
                definedValuesInColumn.push(sudokuTable[i][column].value)
            }
        }
        if ((new Set(definedValuesInColumn)).size !== definedValuesInColumn.length) {
            return false;
        }
        return true;
    }

    // square X - number in {0, 1, 2}
    private checkIfSquareIsCorrect(sudokuTable: SudokuTable, squareX: number, squareY: number): boolean {
        const definedValuesInSquare = [];
        for (let i = squareX * 3; i < (squareX + 1) * 3; i++) {
            for (let j = squareY * 3; j < (squareY + 1) * 3; j++) {
                if (!!sudokuTable[i][j].value) {
                    definedValuesInSquare.push(sudokuTable[i][j].value)
                }
            }
        }
        if ((new Set(definedValuesInSquare)).size !== definedValuesInSquare.length) {
            return false;
        }
        return true;
    }

    // x - integer in [0,8]
    // y - integer in [0,8]
    private checkIfCellIsCorrect(sudokuTable: SudokuTable, x: number, y: number): boolean {
        const value = sudokuTable[x][y].value;

        if (sudokuTable[x].filter(cell => cell.value === value).length > 1) {
            return false;
        }

        let appearancesInColumn = 0;
        for (let i = 0; i < 9; i++) {
            if (sudokuTable[i][y].value === value) {
                appearancesInColumn++;
            }
        }
        if (appearancesInColumn > 1) {
            return false;
        }

        let appearencersInSquare = 0;
        const squareX = Math.floor(x / 3);
        const squareY = Math.floor(y / 3);
        for (let i = squareX * 3; i < (squareX + 1) * 3; i++) {
            for (let j = squareY * 3; j < (squareY + 1) * 3; j++) {
                if (sudokuTable[i][j].value == value) {
                    appearencersInSquare++;
                }
            }
        }
        if (appearencersInSquare > 1) {
            return false;
        }

        return true;
    }
}