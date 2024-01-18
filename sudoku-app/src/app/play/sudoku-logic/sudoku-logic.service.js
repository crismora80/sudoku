"use strict";
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SudokuLogicService = void 0;
var core_1 = require("@angular/core");
var table_model_1 = require("../table/table.model");
var SudokuLogicService = function () {
    var _classDecorators = [(0, core_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var SudokuLogicService = _classThis = /** @class */ (function () {
        function SudokuLogicService_1() {
        }
        SudokuLogicService_1.prototype.generateEmptyTable = function () {
            var sudokuTable = [];
            for (var i = 0; i < 9; i++) {
                sudokuTable[i] = [];
                for (var j = 0; j < 9; j++) {
                    sudokuTable[i][j] = { isFixed: true };
                }
            }
            return sudokuTable;
        };
        SudokuLogicService_1.prototype.resetTable = function (sudokuTable) {
            for (var i = 0; i < 9; i++) {
                for (var j = 0; j < 9; j++) {
                    if (!sudokuTable[i][j].isFixed)
                        sudokuTable[i][j].value = undefined;
                }
            }
        };
        SudokuLogicService_1.prototype.checkIfTableIsFull = function (sudokuTable) {
            var emptyTile = sudokuTable.find(function (row) { return row.find(function (cell) { return !cell.value; }); });
            return !emptyTile;
        };
        SudokuLogicService_1.prototype.checkIfTableIsEmpty = function (sudokuTable) {
            var fullTile = sudokuTable.find(function (row) { return row.find(function (cell) { return cell.value; }); });
            return !fullTile;
        };
        SudokuLogicService_1.prototype.checkIfTableIsCorrect = function (sudokuTable) {
            // check if rows have duplicates
            for (var i = 0; i < 9; i++) {
                var definedValuesInRow = sudokuTable[i].filter(function (cell) { return !!cell.value; }).map(function (cell) { return cell.value; });
                if ((new Set(definedValuesInRow)).size !== definedValuesInRow.length) {
                    return false;
                }
            }
            // check if columns have duplicates 
            for (var j = 0; j < 9; j++) {
                var definedValuesInColumn = [];
                for (var i = 0; i < 9; i++) {
                    if (!!sudokuTable[i][j].value) {
                        definedValuesInColumn.push(sudokuTable[i][j].value);
                    }
                }
                if ((new Set(definedValuesInColumn)).size !== definedValuesInColumn.length) {
                    return false;
                }
            }
            // check if 3x3 squares have duplicate elements
            for (var k = 0; k < 3; k++) {
                for (var l = 0; l < 3; l++) {
                    var definedValuesInSquare = [];
                    for (var i = k * 3; i < (k + 1) * 3; i++) {
                        for (var j = l * 3; j < (l + 1) * 3; j++) {
                            if (!!sudokuTable[i][j].value) {
                                definedValuesInSquare.push(sudokuTable[i][j].value);
                            }
                        }
                    }
                    if ((new Set(definedValuesInSquare)).size !== definedValuesInSquare.length) {
                        return false;
                    }
                }
            }
            return true;
        };
        SudokuLogicService_1.prototype.chooseRandomEmptyCellPosition = function (sudokuTable) {
            if (this.checkIfTableIsFull(sudokuTable)) {
                return [-1, -1];
            }
            var i = Math.floor(Math.random() * 9);
            var j = Math.floor(Math.random() * 9);
            while (!!sudokuTable[i][j].value) {
                i = Math.floor(Math.random() * 9);
                j = Math.floor(Math.random() * 9);
            }
            return [i, j];
        };
        SudokuLogicService_1.prototype.chooseRandomFullCellPosition = function (sudokuTable) {
            if (this.checkIfTableIsEmpty(sudokuTable)) {
                return [-1, -1];
            }
            var i = Math.floor(Math.random() * 9);
            var j = Math.floor(Math.random() * 9);
            while (!sudokuTable[i][j].value) {
                i = Math.floor(Math.random() * 9);
                j = Math.floor(Math.random() * 9);
            }
            return [i, j];
        };
        SudokuLogicService_1.prototype.solveSudoku = function (sudokuTable) {
            var solutions = [];
            if (!this.checkIfTableIsCorrect(sudokuTable)) {
                return [];
            }
            if (this.checkIfTableIsFull(sudokuTable)) {
                return [sudokuTable];
            }
            this.DFS_solve(sudokuTable, solutions);
            return solutions;
        };
        SudokuLogicService_1.prototype.generateSudoku = function (difficultyLevel) {
            var sudokuTable = this.generateEmptyTable();
            var solutions = [];
            this.DFS_solve(sudokuTable, solutions, 0, 0, 1);
            var completeSudokuTable = solutions[0];
            var noToRemove = 0;
            switch (difficultyLevel) {
                case table_model_1.DifficultyLevel.Easy:
                    // [42, 46]
                    noToRemove = Math.floor(Math.random() * 5) + 42;
                    break;
                case table_model_1.DifficultyLevel.Medium:
                    // [44, 48]
                    noToRemove = Math.floor(Math.random() * 5) + 44;
                    break;
                case table_model_1.DifficultyLevel.Hard:
                    // [51, 53]
                    noToRemove = Math.floor(Math.random() * 3) + 51;
                    break;
            }
            this.DFS_remove(completeSudokuTable, noToRemove);
            return completeSudokuTable;
        };
        SudokuLogicService_1.prototype.DFS_solve = function (sudokuTable, result, i, j, maxNoOfSolutions) {
            if (i === void 0) { i = 0; }
            if (j === void 0) { j = 0; }
            if (maxNoOfSolutions === void 0) { maxNoOfSolutions = 2; }
            if (result.length < maxNoOfSolutions) {
                var possibleValues = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
                if (!sudokuTable[i][j].value) {
                    var _loop_1 = function () {
                        var x = possibleValues[Math.floor(Math.random() * possibleValues.length)];
                        possibleValues = possibleValues.filter(function (y) { return y !== x; });
                        sudokuTable[i][j].value = x;
                        if (this_1.checkIfTableIsCorrect(sudokuTable)) {
                            if (this_1.checkIfTableIsFull(sudokuTable)) {
                                result.push(structuredClone(sudokuTable));
                            }
                            else {
                                if (j < 8) {
                                    this_1.DFS_solve(sudokuTable, result, i, j + 1, maxNoOfSolutions);
                                }
                                else {
                                    if (i < 8) {
                                        this_1.DFS_solve(sudokuTable, result, i + 1, 0, maxNoOfSolutions);
                                    }
                                }
                            }
                        }
                    };
                    var this_1 = this;
                    while (possibleValues.length > 0) {
                        _loop_1();
                    }
                    sudokuTable[i][j].value = undefined;
                }
                else {
                    if (j < 8) {
                        this.DFS_solve(sudokuTable, result, i, j + 1, maxNoOfSolutions);
                    }
                    else {
                        if (i < 8) {
                            this.DFS_solve(sudokuTable, result, i + 1, 0, maxNoOfSolutions);
                        }
                    }
                }
            }
        };
        SudokuLogicService_1.prototype.DFS_remove = function (sudokuTable, noToRemove, noOfRemoved) {
            var _a;
            if (noOfRemoved === void 0) { noOfRemoved = 0; }
            if (noOfRemoved < noToRemove) {
                var solutions = [];
                var _b = this.chooseRandomFullCellPosition(sudokuTable), i = _b[0], j = _b[1];
                var valueToBeRemoved = sudokuTable[i][j].value;
                sudokuTable[i][j].value = undefined;
                sudokuTable[i][j].isFixed = false;
                this.DFS_solve(sudokuTable, solutions);
                while (solutions.length > 1) {
                    solutions.length = 0;
                    sudokuTable[i][j].value = valueToBeRemoved;
                    sudokuTable[i][j].isFixed = true;
                    _a = this.chooseRandomFullCellPosition(sudokuTable), i = _a[0], j = _a[1];
                    valueToBeRemoved = sudokuTable[i][j].value;
                    sudokuTable[i][j].value = undefined;
                    sudokuTable[i][j].isFixed = false;
                    this.DFS_solve(sudokuTable, solutions);
                }
                this.DFS_remove(sudokuTable, noToRemove, noOfRemoved + 1);
            }
        };
        return SudokuLogicService_1;
    }());
    __setFunctionName(_classThis, "SudokuLogicService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        SudokuLogicService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return SudokuLogicService = _classThis;
}();
exports.SudokuLogicService = SudokuLogicService;
