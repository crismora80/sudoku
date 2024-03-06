import { TestBed } from '@angular/core/testing';

import { GamesFileParserService } from '../app/play/services/games-file-parser/games-file-parser.service';
import { DifficultyLevel, SudokuTable } from '../app/play/components/table/table.model';
import { SudokuLogicService } from '../app/play/services/sudoku-logic/sudoku-logic.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';

describe('createGames', () => {
  let gamesFileParserSvc: GamesFileParserService;
  let sudokuLogicSvc: SudokuLogicService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [GamesFileParserService, SudokuLogicService, HttpClient]
    });
    gamesFileParserSvc = TestBed.inject(GamesFileParserService);
    sudokuLogicSvc = TestBed.inject(SudokuLogicService);
  });

  // DONE
  // it('creates 100 easy games', done => {
  //   const noOfGames = 100;
  //   const sudokuTables: SudokuTable[] = [];

  //   for (let i = 0; i < noOfGames; i++) {
  //     sudokuTables.push(sudokuLogicSvc.generateSudoku(DifficultyLevel.Easy));
  //     console.log("generated game " + (i + 1));
  //   }

  //   gamesFileParserSvc.writeGames(sudokuTables, './../assets/data/easy.json').subscribe({
  //     next: (v) => console.log(v),
  //     error: (e) => console.error(e),
  //     complete: () => { console.info('complete'); done() }
  //   })
  // }, 9999999999999999);

  // DONE
  it('creates 100 medium games', done => {
    const noOfGames = 100;
    const sudokuTables: SudokuTable[] = [];

    for (let i = 0; i < noOfGames; i++) {
      sudokuTables.push(sudokuLogicSvc.generateSudoku(DifficultyLevel.Medium));
      console.log("generated game " + (i + 1));
    }

    gamesFileParserSvc.writeGames(sudokuTables, './../assets/data/medium.json').subscribe({
      next: (v) => console.log(v),
      error: (e) => console.error(e),
      complete: () => { console.info('complete'); done(); }
    })
  }, 9999999999999999);

  // DONE
  // it('creates 100 hard games', done => {
  //   const noOfGames = 100;
  //   const sudokuTables: SudokuTable[] = [];

  //   for (let i = 0; i < noOfGames; i++) {
  //     sudokuTables.push(sudokuLogicSvc.generateSudoku(DifficultyLevel.Hard));
  //     console.log("generated game " + (i + 1));
  //   }

  //   gamesFileParserSvc.writeGames(sudokuTables, './../assets/data/hard.json').subscribe({
  //     next: (v) => console.log(v),
  //     error: (e) => console.error(e),
  //     complete: () => { console.info('complete'); done(); }
  //   })
  // }, 9999999999999999);
});
