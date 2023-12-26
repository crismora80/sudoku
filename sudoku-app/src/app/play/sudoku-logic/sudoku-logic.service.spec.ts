import { TestBed } from "@angular/core/testing";
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
});