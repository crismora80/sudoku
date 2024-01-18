"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var table_model_1 = require("src/app/play/table/table.model");
var sudoku_logic_service_1 = require("../app/play/sudoku-logic/sudoku-logic.service");
function createEasyGames(noOfGames) {
    var sudokuLogicSvc = new sudoku_logic_service_1.SudokuLogicService();
    var sudokuTables = [];
    for (var i = 0; i < noOfGames; i++) {
        sudokuTables.push(sudokuLogicSvc.generateSudoku(table_model_1.DifficultyLevel.Easy));
    }
}
function main() {
    createEasyGames(2);
}
main();
