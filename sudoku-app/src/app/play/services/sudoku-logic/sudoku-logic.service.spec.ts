import { TestBed } from "@angular/core/testing";
import { DifficultyLevel } from "../../components/table/table.model";
import { SudokuLogicService } from "./sudoku-logic.service";

describe('SudokuLogicService', () => {
    let service: SudokuLogicService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [SudokuLogicService],
        });

        service = TestBed.inject(SudokuLogicService);
    });

    it('#checkIfTableIsFull should return false if there is one value in the table', () => {
        const table = service.generateEmptyTable();
        table[8][8].value = "1";
        expect(service.checkIfTableIsFull(table)).toBeFalsy();
    });

    it('#checkIfTableIsFull should return true if the table contains all values', () => {
        const table = service.generateEmptyTable();
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                table[i][j].value = "1";
            }
        }
        expect(service.checkIfTableIsFull(table)).toBeTruthy();
    });

    it('#checkIfTableIsEmpty should return false if there is one value in the table', () => {
        const table = service.generateEmptyTable();
        table[8][8].value = "1";
        expect((service as any).checkIfTableIsEmpty(table)).toBeFalsy();
    });

    it('#checkIfTableIsEmpty should return true if the table does not contain any value', () => {
        const table = service.generateEmptyTable();
        expect((service as any).checkIfTableIsEmpty(table)).toBeTruthy();
    });

    it('#checkIfTableIsCorrect should return true if the table is empty', () => {
        const table = service.generateEmptyTable();
        expect(service.checkIfTableIsCorrect(table)).toBeTruthy();
    });

    it('#checkIfTableIsCorrect should return true if the table has one value', () => {
        const table = service.generateEmptyTable();
        table[8][8].value = "1";
        expect(service.checkIfTableIsCorrect(table)).toBeTruthy();
    });

    it('#checkIfTableIsCorrect should return true if the table is completed correctly', () => {
        const table = [
            [{ value: "5", isFixed: false }, { value: "3", isFixed: false }, { value: "4", isFixed: false }, { value: "6", isFixed: false }, { value: "7", isFixed: false }, { value: "8", isFixed: false }, { value: "9", isFixed: false }, { value: "1", isFixed: false }, { value: "2", isFixed: false },],
            [{ value: "6", isFixed: false }, { value: "7", isFixed: false }, { value: "2", isFixed: false }, { value: "1", isFixed: false }, { value: "9", isFixed: false }, { value: "5", isFixed: false }, { value: "3", isFixed: false }, { value: "4", isFixed: false }, { value: "8", isFixed: false },],
            [{ value: "1", isFixed: false }, { value: "9", isFixed: false }, { value: "8", isFixed: false }, { value: "3", isFixed: false }, { value: "4", isFixed: false }, { value: "2", isFixed: false }, { value: "5", isFixed: false }, { value: "6", isFixed: false }, { value: "7", isFixed: false },],
            [{ value: "8", isFixed: false }, { value: "5", isFixed: false }, { value: "9", isFixed: false }, { value: "7", isFixed: false }, { value: "6", isFixed: false }, { value: "1", isFixed: false }, { value: "4", isFixed: false }, { value: "2", isFixed: false }, { value: "3", isFixed: false },],
            [{ value: "4", isFixed: false }, { value: "2", isFixed: false }, { value: "6", isFixed: false }, { value: "8", isFixed: false }, { value: "5", isFixed: false }, { value: "3", isFixed: false }, { value: "7", isFixed: false }, { value: "9", isFixed: false }, { value: "1", isFixed: false },],
            [{ value: "7", isFixed: false }, { value: "1", isFixed: false }, { value: "3", isFixed: false }, { value: "9", isFixed: false }, { value: "2", isFixed: false }, { value: "4", isFixed: false }, { value: "8", isFixed: false }, { value: "5", isFixed: false }, { value: "6", isFixed: false },],
            [{ value: "9", isFixed: false }, { value: "6", isFixed: false }, { value: "1", isFixed: false }, { value: "5", isFixed: false }, { value: "3", isFixed: false }, { value: "7", isFixed: false }, { value: "2", isFixed: false }, { value: "8", isFixed: false }, { value: "4", isFixed: false },],
            [{ value: "2", isFixed: false }, { value: "8", isFixed: false }, { value: "7", isFixed: false }, { value: "4", isFixed: false }, { value: "1", isFixed: false }, { value: "9", isFixed: false }, { value: "6", isFixed: false }, { value: "3", isFixed: false }, { value: "5", isFixed: false },],
            [{ value: "3", isFixed: false }, { value: "4", isFixed: false }, { value: "5", isFixed: false }, { value: "2", isFixed: false }, { value: "8", isFixed: false }, { value: "6", isFixed: false }, { value: "1", isFixed: false }, { value: "7", isFixed: false }, { value: "9", isFixed: false },]
        ];
        expect(service.checkIfTableIsCorrect(table)).toBeTruthy();
    });

    it('#checkIfTableIsCorrect should return false if the table is complete and has a repeating value', () => {
        // changed value [5][3] to 1
        const table = [
            [{ value: "5", isFixed: false }, { value: "3", isFixed: false }, { value: "4", isFixed: false }, { value: "6", isFixed: false }, { value: "7", isFixed: false }, { value: "8", isFixed: false }, { value: "9", isFixed: false }, { value: "1", isFixed: false }, { value: "2", isFixed: false },],
            [{ value: "6", isFixed: false }, { value: "7", isFixed: false }, { value: "2", isFixed: false }, { value: "1", isFixed: false }, { value: "9", isFixed: false }, { value: "5", isFixed: false }, { value: "3", isFixed: false }, { value: "4", isFixed: false }, { value: "8", isFixed: false },],
            [{ value: "1", isFixed: false }, { value: "9", isFixed: false }, { value: "8", isFixed: false }, { value: "3", isFixed: false }, { value: "4", isFixed: false }, { value: "2", isFixed: false }, { value: "5", isFixed: false }, { value: "6", isFixed: false }, { value: "7", isFixed: false },],
            [{ value: "8", isFixed: false }, { value: "5", isFixed: false }, { value: "9", isFixed: false }, { value: "7", isFixed: false }, { value: "6", isFixed: false }, { value: "1", isFixed: false }, { value: "4", isFixed: false }, { value: "2", isFixed: false }, { value: "3", isFixed: false },],
            [{ value: "4", isFixed: false }, { value: "2", isFixed: false }, { value: "6", isFixed: false }, { value: "8", isFixed: false }, { value: "5", isFixed: false }, { value: "3", isFixed: false }, { value: "7", isFixed: false }, { value: "9", isFixed: false }, { value: "1", isFixed: false },],
            [{ value: "7", isFixed: false }, { value: "1", isFixed: false }, { value: "3", isFixed: false }, { value: "1", isFixed: false }, { value: "2", isFixed: false }, { value: "4", isFixed: false }, { value: "8", isFixed: false }, { value: "5", isFixed: false }, { value: "6", isFixed: false },],
            [{ value: "9", isFixed: false }, { value: "6", isFixed: false }, { value: "1", isFixed: false }, { value: "5", isFixed: false }, { value: "3", isFixed: false }, { value: "7", isFixed: false }, { value: "2", isFixed: false }, { value: "8", isFixed: false }, { value: "4", isFixed: false },],
            [{ value: "2", isFixed: false }, { value: "8", isFixed: false }, { value: "7", isFixed: false }, { value: "4", isFixed: false }, { value: "1", isFixed: false }, { value: "9", isFixed: false }, { value: "6", isFixed: false }, { value: "3", isFixed: false }, { value: "5", isFixed: false },],
            [{ value: "3", isFixed: false }, { value: "4", isFixed: false }, { value: "5", isFixed: false }, { value: "2", isFixed: false }, { value: "8", isFixed: false }, { value: "6", isFixed: false }, { value: "1", isFixed: false }, { value: "7", isFixed: false }, { value: "9", isFixed: false },]
        ];
        expect(service.checkIfTableIsCorrect(table)).toBeFalsy();
    });

    it('#checkIfTableIsCorrect should return false if the table has a repeating value on a row', () => {
        const table = service.generateEmptyTable();
        table[2][3].value = "1";
        table[2][8].value = "1";
        expect(service.checkIfTableIsCorrect(table)).toBeFalsy();
    });

    it('#checkIfTableIsCorrect should return false if the table has a full row and a repeating value on that row', () => {
        const table = service.generateEmptyTable();
        table[2][0].value = "2";
        table[2][1].value = "8";
        table[2][2].value = "3";
        table[2][3].value = "1";
        table[2][4].value = "9";
        table[2][5].value = "4";
        table[2][6].value = "7";
        table[2][7].value = "6";
        table[2][8].value = "9";
        expect(service.checkIfTableIsCorrect(table)).toBeFalsy();
    });

    it('#checkIfTableIsCorrect should return true if the table has just one correct row and empty values otherwise', () => {
        const table = service.generateEmptyTable();
        table[2][0].value = "2";
        table[2][1].value = "8";
        table[2][2].value = "3";
        table[2][3].value = "1";
        table[2][4].value = "9";
        table[2][5].value = "4";
        table[2][6].value = "7";
        table[2][7].value = "6";
        table[2][8].value = "5";
        expect(service.checkIfTableIsCorrect(table)).toBeTruthy();
    });

    it('#checkIfTableIsCorrect should return false if the table has a repeating value on a column', () => {
        const table = service.generateEmptyTable();
        table[3][2].value = "1";
        table[8][2].value = "1";
        expect(service.checkIfTableIsCorrect(table)).toBeFalsy();
    });

    it('#checkIfTableIsCorrect should return false if the table has a full column and a repeating value on that column', () => {
        const table = service.generateEmptyTable();
        table[0][2].value = "2";
        table[1][2].value = "8";
        table[2][2].value = "3";
        table[3][2].value = "1";
        table[4][2].value = "5";
        table[5][2].value = "8";
        table[6][2].value = "7";
        table[7][2].value = "6";
        table[8][2].value = "9";
        expect(service.checkIfTableIsCorrect(table)).toBeFalsy();
    });

    it('#checkIfTableIsCorrect should return true if the table has just one correct row and empty values otherwise', () => {
        const table = service.generateEmptyTable();
        table[0][2].value = "2";
        table[1][2].value = "4";
        table[2][2].value = "3";
        table[3][2].value = "1";
        table[4][2].value = "5";
        table[5][2].value = "8";
        table[6][2].value = "7";
        table[7][2].value = "6";
        table[8][2].value = "9";
        expect(service.checkIfTableIsCorrect(table)).toBeTruthy();
    });

    it('#checkIfTableIsCorrect should return false if the table has a repeating value on a 3x3 aquare', () => {
        const table = service.generateEmptyTable();
        table[1][1].value = "1";
        table[2][0].value = "1";
        expect(service.checkIfTableIsCorrect(table)).toBeFalsy();
    });

    it('#checkIfTableIsCorrect should return false if the table has a full 3x3 square and a repeating value on that square', () => {
        const table = service.generateEmptyTable();
        table[0][0].value = "2";
        table[0][1].value = "4";
        table[0][2].value = "3";
        table[1][0].value = "1";
        table[1][1].value = "5";
        table[1][2].value = "8";
        table[2][0].value = "7";
        table[2][1].value = "4";
        table[2][2].value = "9";
        expect(service.checkIfTableIsCorrect(table)).toBeFalsy();
    });

    it('#checkIfTableIsCorrect should return true if the table has just one correct 3x3 square and empty values otherwise', () => {
        const table = service.generateEmptyTable();
        table[0][0].value = "2";
        table[0][1].value = "6";
        table[0][2].value = "3";
        table[1][0].value = "1";
        table[1][1].value = "5";
        table[1][2].value = "8";
        table[2][0].value = "7";
        table[2][1].value = "4";
        table[2][2].value = "9";
        expect(service.checkIfTableIsCorrect(table)).toBeTruthy();
    });

    it('#chooseRandomEmptyCell returns [-1,-1] if table is full', () => {
        const table = [
            [{ value: "5", isFixed: false }, { value: "3", isFixed: false }, { value: "4", isFixed: false }, { value: "6", isFixed: false }, { value: "7", isFixed: false }, { value: "8", isFixed: false }, { value: "9", isFixed: false }, { value: "1", isFixed: false }, { value: "2", isFixed: false },],
            [{ value: "6", isFixed: false }, { value: "7", isFixed: false }, { value: "2", isFixed: false }, { value: "1", isFixed: false }, { value: "9", isFixed: false }, { value: "5", isFixed: false }, { value: "3", isFixed: false }, { value: "4", isFixed: false }, { value: "8", isFixed: false },],
            [{ value: "1", isFixed: false }, { value: "9", isFixed: false }, { value: "8", isFixed: false }, { value: "3", isFixed: false }, { value: "4", isFixed: false }, { value: "2", isFixed: false }, { value: "5", isFixed: false }, { value: "6", isFixed: false }, { value: "7", isFixed: false },],
            [{ value: "8", isFixed: false }, { value: "5", isFixed: false }, { value: "9", isFixed: false }, { value: "7", isFixed: false }, { value: "6", isFixed: false }, { value: "1", isFixed: false }, { value: "4", isFixed: false }, { value: "2", isFixed: false }, { value: "3", isFixed: false },],
            [{ value: "4", isFixed: false }, { value: "2", isFixed: false }, { value: "6", isFixed: false }, { value: "8", isFixed: false }, { value: "5", isFixed: false }, { value: "3", isFixed: false }, { value: "7", isFixed: false }, { value: "9", isFixed: false }, { value: "1", isFixed: false },],
            [{ value: "7", isFixed: false }, { value: "1", isFixed: false }, { value: "3", isFixed: false }, { value: "9", isFixed: false }, { value: "2", isFixed: false }, { value: "4", isFixed: false }, { value: "8", isFixed: false }, { value: "5", isFixed: false }, { value: "6", isFixed: false },],
            [{ value: "9", isFixed: false }, { value: "6", isFixed: false }, { value: "1", isFixed: false }, { value: "5", isFixed: false }, { value: "3", isFixed: false }, { value: "7", isFixed: false }, { value: "2", isFixed: false }, { value: "8", isFixed: false }, { value: "4", isFixed: false },],
            [{ value: "2", isFixed: false }, { value: "8", isFixed: false }, { value: "7", isFixed: false }, { value: "4", isFixed: false }, { value: "1", isFixed: false }, { value: "9", isFixed: false }, { value: "6", isFixed: false }, { value: "3", isFixed: false }, { value: "5", isFixed: false },],
            [{ value: "3", isFixed: false }, { value: "4", isFixed: false }, { value: "5", isFixed: false }, { value: "2", isFixed: false }, { value: "8", isFixed: false }, { value: "6", isFixed: false }, { value: "1", isFixed: false }, { value: "7", isFixed: false }, { value: "9", isFixed: false },]
        ];
        expect(service.chooseRandomEmptyCellPosition(table)).toEqual([-1, -1]);
    })

    it('#chooseRandomEmptyCellPosition returns the position of an empty cell in a table where only one cell value is missing', () => {
        const table = [
            [{ value: "5", isFixed: false }, { value: "3", isFixed: false }, { value: "4", isFixed: false }, { value: "6", isFixed: false }, { value: "7", isFixed: false }, { value: "8", isFixed: false }, { value: "9", isFixed: false }, { value: "1", isFixed: false }, { value: "2", isFixed: false },],
            [{ value: "6", isFixed: false }, { value: "7", isFixed: false }, { value: "2", isFixed: false }, { value: "1", isFixed: false }, { value: "9", isFixed: false }, { value: "5", isFixed: false }, { value: "3", isFixed: false }, { value: "4", isFixed: false }, { value: "8", isFixed: false },],
            [{ value: "1", isFixed: false }, { value: "9", isFixed: false }, { value: "8", isFixed: false }, { value: "3", isFixed: false }, { value: "4", isFixed: false }, { value: "2", isFixed: false }, { value: "5", isFixed: false }, { value: "6", isFixed: false }, { value: "7", isFixed: false },],
            [{ value: "8", isFixed: false }, { value: "5", isFixed: false }, { value: "9", isFixed: false }, { value: "7", isFixed: false }, { value: "6", isFixed: false }, { value: "1", isFixed: false }, { value: "4", isFixed: false }, { value: "2", isFixed: false }, { value: "3", isFixed: false },],
            [{ value: "4", isFixed: false }, { value: "2", isFixed: false }, { value: "6", isFixed: false }, { value: "8", isFixed: false }, { value: "5", isFixed: false }, { value: "3", isFixed: false }, { value: "7", isFixed: false }, { value: "9", isFixed: false }, { value: "1", isFixed: false },],
            [{ value: "7", isFixed: false }, { value: "1", isFixed: false }, { value: "3", isFixed: false }, { value: "9", isFixed: false }, { value: "2", isFixed: false }, { value: "4", isFixed: false }, { value: "8", isFixed: false }, { value: "5", isFixed: false }, { value: "6", isFixed: false },],
            [{ value: "9", isFixed: false }, { value: "6", isFixed: false }, { value: "1", isFixed: false }, { value: "5", isFixed: false }, { value: "3", isFixed: false }, { value: "7", isFixed: false }, { value: "2", isFixed: false }, { value: "8", isFixed: false }, { value: "4", isFixed: false },],
            [{ value: "2", isFixed: false }, { value: "8", isFixed: false }, { value: "7", isFixed: false }, { value: "4", isFixed: false }, { value: "1", isFixed: false }, { value: "9", isFixed: false }, { value: "6", isFixed: false }, { value: "3", isFixed: false }, { value: "5", isFixed: false },],
            [{ value: "3", isFixed: false }, { value: "4", isFixed: false }, { value: "5", isFixed: false }, { value: "2", isFixed: false }, { value: "8", isFixed: false }, { value: "6", isFixed: false }, { value: "1", isFixed: false }, { value: "7", isFixed: false }, { value: "9", isFixed: false },]
        ];
        table[7][4].value = '';
        expect(service.chooseRandomEmptyCellPosition(table)).toEqual([7, 4]);
    });

    it('#chooseRandomFullCellPosition returns [-1,-1] if table is empty', () => {
        const table = service.generateEmptyTable();
        expect(service.chooseRandomFullCellPosition(table)).toEqual([-1, -1]);
    })

    it('#chooseRandomFullCellPosition returns the position a full cell if the table contains only one full cell', () => {
        const table = service.generateEmptyTable();
        table[7][4].value = '1';
        expect(service.chooseRandomFullCellPosition(table)).toEqual([7, 4]);
    });

    it('#solveSudoku returns returns no solution for non-full incorrect table', () => {
        const table = service.generateEmptyTable();
        table[1][6].value = "2";
        table[7][6].value = "2";
        expect(service.solveSudoku(table)).toEqual([]);
    });

    it('#solveSudoku returns no solution for full incorrect table', () => {
        const table = [
            [{ value: "5", isFixed: false }, { value: "3", isFixed: false }, { value: "4", isFixed: false }, { value: "6", isFixed: false }, { value: "7", isFixed: false }, { value: "8", isFixed: false }, { value: "9", isFixed: false }, { value: "1", isFixed: false }, { value: "2", isFixed: false },],
            [{ value: "6", isFixed: false }, { value: "7", isFixed: false }, { value: "2", isFixed: false }, { value: "1", isFixed: false }, { value: "9", isFixed: false }, { value: "5", isFixed: false }, { value: "3", isFixed: false }, { value: "4", isFixed: false }, { value: "8", isFixed: false },],
            [{ value: "1", isFixed: false }, { value: "9", isFixed: false }, { value: "8", isFixed: false }, { value: "3", isFixed: false }, { value: "4", isFixed: false }, { value: "2", isFixed: false }, { value: "5", isFixed: false }, { value: "6", isFixed: false }, { value: "7", isFixed: false },],
            [{ value: "8", isFixed: false }, { value: "5", isFixed: false }, { value: "9", isFixed: false }, { value: "7", isFixed: false }, { value: "6", isFixed: false }, { value: "1", isFixed: false }, { value: "4", isFixed: false }, { value: "2", isFixed: false }, { value: "3", isFixed: false },],
            [{ value: "4", isFixed: false }, { value: "2", isFixed: false }, { value: "6", isFixed: false }, { value: "8", isFixed: false }, { value: "5", isFixed: false }, { value: "3", isFixed: false }, { value: "7", isFixed: false }, { value: "9", isFixed: false }, { value: "1", isFixed: false },],
            [{ value: "7", isFixed: false }, { value: "1", isFixed: false }, { value: "3", isFixed: false }, { value: "9", isFixed: false }, { value: "2", isFixed: false }, { value: "4", isFixed: false }, { value: "8", isFixed: false }, { value: "5", isFixed: false }, { value: "6", isFixed: false },],
            [{ value: "9", isFixed: false }, { value: "6", isFixed: false }, { value: "1", isFixed: false }, { value: "5", isFixed: false }, { value: "3", isFixed: false }, { value: "7", isFixed: false }, { value: "2", isFixed: false }, { value: "8", isFixed: false }, { value: "4", isFixed: false },],
            [{ value: "2", isFixed: false }, { value: "3", isFixed: false }, { value: "7", isFixed: false }, { value: "4", isFixed: false }, { value: "1", isFixed: false }, { value: "9", isFixed: false }, { value: "6", isFixed: false }, { value: "3", isFixed: false }, { value: "5", isFixed: false },],
            [{ value: "3", isFixed: false }, { value: "4", isFixed: false }, { value: "5", isFixed: false }, { value: "2", isFixed: false }, { value: "8", isFixed: false }, { value: "6", isFixed: false }, { value: "1", isFixed: false }, { value: "7", isFixed: false }, { value: "9", isFixed: false },]
        ];
        expect(service.solveSudoku(table)).toEqual([])
    });

    it('#solveSudoku returns full correct table as it is', () => {
        const table = [
            [{ value: "5", isFixed: false }, { value: "3", isFixed: false }, { value: "4", isFixed: false }, { value: "6", isFixed: false }, { value: "7", isFixed: false }, { value: "8", isFixed: false }, { value: "9", isFixed: false }, { value: "1", isFixed: false }, { value: "2", isFixed: false },],
            [{ value: "6", isFixed: false }, { value: "7", isFixed: false }, { value: "2", isFixed: false }, { value: "1", isFixed: false }, { value: "9", isFixed: false }, { value: "5", isFixed: false }, { value: "3", isFixed: false }, { value: "4", isFixed: false }, { value: "8", isFixed: false },],
            [{ value: "1", isFixed: false }, { value: "9", isFixed: false }, { value: "8", isFixed: false }, { value: "3", isFixed: false }, { value: "4", isFixed: false }, { value: "2", isFixed: false }, { value: "5", isFixed: false }, { value: "6", isFixed: false }, { value: "7", isFixed: false },],
            [{ value: "8", isFixed: false }, { value: "5", isFixed: false }, { value: "9", isFixed: false }, { value: "7", isFixed: false }, { value: "6", isFixed: false }, { value: "1", isFixed: false }, { value: "4", isFixed: false }, { value: "2", isFixed: false }, { value: "3", isFixed: false },],
            [{ value: "4", isFixed: false }, { value: "2", isFixed: false }, { value: "6", isFixed: false }, { value: "8", isFixed: false }, { value: "5", isFixed: false }, { value: "3", isFixed: false }, { value: "7", isFixed: false }, { value: "9", isFixed: false }, { value: "1", isFixed: false },],
            [{ value: "7", isFixed: false }, { value: "1", isFixed: false }, { value: "3", isFixed: false }, { value: "9", isFixed: false }, { value: "2", isFixed: false }, { value: "4", isFixed: false }, { value: "8", isFixed: false }, { value: "5", isFixed: false }, { value: "6", isFixed: false },],
            [{ value: "9", isFixed: false }, { value: "6", isFixed: false }, { value: "1", isFixed: false }, { value: "5", isFixed: false }, { value: "3", isFixed: false }, { value: "7", isFixed: false }, { value: "2", isFixed: false }, { value: "8", isFixed: false }, { value: "4", isFixed: false },],
            [{ value: "2", isFixed: false }, { value: "8", isFixed: false }, { value: "7", isFixed: false }, { value: "4", isFixed: false }, { value: "1", isFixed: false }, { value: "9", isFixed: false }, { value: "6", isFixed: false }, { value: "3", isFixed: false }, { value: "5", isFixed: false },],
            [{ value: "3", isFixed: false }, { value: "4", isFixed: false }, { value: "5", isFixed: false }, { value: "2", isFixed: false }, { value: "8", isFixed: false }, { value: "6", isFixed: false }, { value: "1", isFixed: false }, { value: "7", isFixed: false }, { value: "9", isFixed: false },]
        ];
        expect(service.solveSudoku(table)).toEqual([table])
    });

    it('#solveSudoku returns two possible solutions if initial table is empty', () => {
        const table = service.generateEmptyTable();
        const solution = service.solveSudoku(table);
        expect(solution.length).toEqual(2);
        expect(service.checkIfTableIsFull(solution[0])).toBeTruthy();
        expect(service.checkIfTableIsFull(solution[1])).toBeTruthy();
        expect(service.checkIfTableIsCorrect(solution[0])).toBeTruthy();
        expect(service.checkIfTableIsCorrect(solution[1])).toBeTruthy();
    });

    it('#solveSudoku returns two possible solutions if initial table is correct, non-empty and has multiple solutions', () => {
        const table = service.generateEmptyTable();
        table[0][0].value = "1";
        table[1][1].value = "2";
        table[2][2].value = "3";
        table[3][3].value = "4";
        table[4][4].value = "5";
        table[5][5].value = "6";
        table[6][6].value = "7";
        table[7][7].value = "8";
        table[8][8].value = "9";
        const solution = service.solveSudoku(table);
        expect(solution.length).toEqual(2);
        expect(service.checkIfTableIsFull(solution[0])).toBeTruthy();
        expect(service.checkIfTableIsFull(solution[1])).toBeTruthy();
        expect(service.checkIfTableIsCorrect(solution[0])).toBeTruthy();
        expect(service.checkIfTableIsCorrect(solution[1])).toBeTruthy();
    });

    it('#solveSudoku returns the solution if initial table is correct, non-empty and has a single solution', () => {
        const initialTable = [
            [{ value: "5", isFixed: false }, { value: "3", isFixed: false }, { value: undefined, isFixed: false }, { value: undefined, isFixed: false }, { value: "7", isFixed: false }, { value: undefined, isFixed: false }, { value: undefined, isFixed: false }, { value: undefined, isFixed: false }, { value: undefined, isFixed: false },],
            [{ value: "6", isFixed: false }, { value: undefined, isFixed: false }, { value: undefined, isFixed: false }, { value: "1", isFixed: false }, { value: "9", isFixed: false }, { value: "5", isFixed: false }, { value: undefined, isFixed: false }, { value: undefined, isFixed: false }, { value: undefined, isFixed: false },],
            [{ value: undefined, isFixed: false }, { value: "9", isFixed: false }, { value: "8", isFixed: false }, { value: undefined, isFixed: false }, { value: undefined, isFixed: false }, { value: undefined, isFixed: false }, { value: undefined, isFixed: false }, { value: "6", isFixed: false }, { value: undefined, isFixed: false },],
            [{ value: "8", isFixed: false }, { value: undefined, isFixed: false }, { value: undefined, isFixed: false }, { value: undefined, isFixed: false }, { value: "6", isFixed: false }, { value: undefined, isFixed: false }, { value: undefined, isFixed: false }, { value: undefined, isFixed: false }, { value: "3", isFixed: false },],
            [{ value: "4", isFixed: false }, { value: undefined, isFixed: false }, { value: undefined, isFixed: false }, { value: "8", isFixed: false }, { value: undefined, isFixed: false }, { value: "3", isFixed: false }, { value: undefined, isFixed: false }, { value: undefined, isFixed: false }, { value: "1", isFixed: false },],
            [{ value: "7", isFixed: false }, { value: undefined, isFixed: false }, { value: undefined, isFixed: false }, { value: undefined, isFixed: false }, { value: "2", isFixed: false }, { value: undefined, isFixed: false }, { value: undefined, isFixed: false }, { value: undefined, isFixed: false }, { value: "6", isFixed: false },],
            [{ value: undefined, isFixed: false }, { value: "6", isFixed: false }, { value: undefined, isFixed: false }, { value: undefined, isFixed: false }, { value: undefined, isFixed: false }, { value: undefined, isFixed: false }, { value: "2", isFixed: false }, { value: "8", isFixed: false }, { value: undefined, isFixed: false },],
            [{ value: undefined, isFixed: false }, { value: undefined, isFixed: false }, { value: undefined, isFixed: false }, { value: "4", isFixed: false }, { value: "1", isFixed: false }, { value: "9", isFixed: false }, { value: undefined, isFixed: false }, { value: undefined, isFixed: false }, { value: "5", isFixed: false },],
            [{ value: undefined, isFixed: false }, { value: undefined, isFixed: false }, { value: undefined, isFixed: false }, { value: undefined, isFixed: false }, { value: "8", isFixed: false }, { value: undefined, isFixed: false }, { value: undefined, isFixed: false }, { value: "7", isFixed: false }, { value: "9", isFixed: false },]
        ];
        const expectedTable = [
            [{ value: "5", isFixed: false }, { value: "3", isFixed: false }, { value: "4", isFixed: false }, { value: "6", isFixed: false }, { value: "7", isFixed: false }, { value: "8", isFixed: false }, { value: "9", isFixed: false }, { value: "1", isFixed: false }, { value: "2", isFixed: false },],
            [{ value: "6", isFixed: false }, { value: "7", isFixed: false }, { value: "2", isFixed: false }, { value: "1", isFixed: false }, { value: "9", isFixed: false }, { value: "5", isFixed: false }, { value: "3", isFixed: false }, { value: "4", isFixed: false }, { value: "8", isFixed: false },],
            [{ value: "1", isFixed: false }, { value: "9", isFixed: false }, { value: "8", isFixed: false }, { value: "3", isFixed: false }, { value: "4", isFixed: false }, { value: "2", isFixed: false }, { value: "5", isFixed: false }, { value: "6", isFixed: false }, { value: "7", isFixed: false },],
            [{ value: "8", isFixed: false }, { value: "5", isFixed: false }, { value: "9", isFixed: false }, { value: "7", isFixed: false }, { value: "6", isFixed: false }, { value: "1", isFixed: false }, { value: "4", isFixed: false }, { value: "2", isFixed: false }, { value: "3", isFixed: false },],
            [{ value: "4", isFixed: false }, { value: "2", isFixed: false }, { value: "6", isFixed: false }, { value: "8", isFixed: false }, { value: "5", isFixed: false }, { value: "3", isFixed: false }, { value: "7", isFixed: false }, { value: "9", isFixed: false }, { value: "1", isFixed: false },],
            [{ value: "7", isFixed: false }, { value: "1", isFixed: false }, { value: "3", isFixed: false }, { value: "9", isFixed: false }, { value: "2", isFixed: false }, { value: "4", isFixed: false }, { value: "8", isFixed: false }, { value: "5", isFixed: false }, { value: "6", isFixed: false },],
            [{ value: "9", isFixed: false }, { value: "6", isFixed: false }, { value: "1", isFixed: false }, { value: "5", isFixed: false }, { value: "3", isFixed: false }, { value: "7", isFixed: false }, { value: "2", isFixed: false }, { value: "8", isFixed: false }, { value: "4", isFixed: false },],
            [{ value: "2", isFixed: false }, { value: "8", isFixed: false }, { value: "7", isFixed: false }, { value: "4", isFixed: false }, { value: "1", isFixed: false }, { value: "9", isFixed: false }, { value: "6", isFixed: false }, { value: "3", isFixed: false }, { value: "5", isFixed: false },],
            [{ value: "3", isFixed: false }, { value: "4", isFixed: false }, { value: "5", isFixed: false }, { value: "2", isFixed: false }, { value: "8", isFixed: false }, { value: "6", isFixed: false }, { value: "1", isFixed: false }, { value: "7", isFixed: false }, { value: "9", isFixed: false },]
        ];
        const solution = service.solveSudoku(initialTable);
        expect(solution.length).toEqual(1);
        expect(solution[0]).toEqual(expectedTable);
    });

    it('#generateSudoku returns correct table with easy difficulty', () => {
        const table = service.generateSudoku(DifficultyLevel.Easy);

        expect((service as any).checkIfTableIsEmpty(table)).toBeFalsy();
        expect(service.checkIfTableIsFull(table)).toBeFalsy();
        expect(service.checkIfTableIsCorrect(table)).toBeTruthy();

        const solution = service.solveSudoku(table);
        expect(solution.length).toEqual(1);
    });

    it('#generateSudoku returns correct table with medium difficulty', () => {
        const table = service.generateSudoku(DifficultyLevel.Medium);

        expect((service as any).checkIfTableIsEmpty(table)).toBeFalsy();
        expect(service.checkIfTableIsFull(table)).toBeFalsy();
        expect(service.checkIfTableIsCorrect(table)).toBeTruthy();

        const solution = service.solveSudoku(table);
        expect(solution.length).toEqual(1);
    });

    it('#generateSudoku returns correct table with hard difficulty', () => {
        const table = service.generateSudoku(DifficultyLevel.Hard);

        expect((service as any).checkIfTableIsEmpty(table)).toBeFalsy();
        expect(service.checkIfTableIsFull(table)).toBeFalsy();
        expect(service.checkIfTableIsCorrect(table)).toBeTruthy();

        const solution = service.solveSudoku(table);
        expect(solution.length).toEqual(1);
    });
});