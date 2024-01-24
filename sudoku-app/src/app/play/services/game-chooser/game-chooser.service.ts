import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { GamesFileParserService } from '../games-file-parser/games-file-parser.service';
import { DifficultyLevel, SudokuTable } from '../../components/table/table.model';
import { of } from 'rxjs';

@Injectable()
export class GameChooserService {

  constructor(private gamesFileParserSvc: GamesFileParserService) { }

  getGame(difficultyLevel: DifficultyLevel): Observable<SudokuTable> {
    const fileName = this.getFileName(difficultyLevel);
    return this.gamesFileParserSvc.readGames(fileName)
      .pipe(map((result: number[][][]) => {
        const randomGame = this.chooseRandomGame(result);
        return this.convertNumbersArrayToModel(randomGame);
      }));
  }

  // get game with only one missing number
  getDummyGame(): Observable<SudokuTable> {
    const table = [
      [{ value: "5", isFixed: true }, { value: "3", isFixed: true }, { value: "4", isFixed: true }, { value: "6", isFixed: true }, { value: "7", isFixed: true }, { value: "8", isFixed: true }, { value: "9", isFixed: true }, { value: "1", isFixed: true }, { value: "2", isFixed: true },],
      [{ value: "6", isFixed: true }, { value: "7", isFixed: true }, { value: "2", isFixed: true }, { value: "1", isFixed: true }, { value: "9", isFixed: true }, { value: "5", isFixed: true }, { value: "3", isFixed: true }, { value: "4", isFixed: true }, { value: "8", isFixed: true },],
      [{ value: "1", isFixed: true }, { value: "9", isFixed: true }, { value: "8", isFixed: true }, { value: "3", isFixed: true }, { value: "4", isFixed: true }, { value: "2", isFixed: true }, { value: "5", isFixed: true }, { value: "6", isFixed: true }, { value: "7", isFixed: true },],
      [{ value: "8", isFixed: true }, { value: "5", isFixed: true }, { value: "9", isFixed: true }, { value: "7", isFixed: true }, { value: "6", isFixed: true }, { value: "1", isFixed: true }, { value: "4", isFixed: true }, { value: "2", isFixed: true }, { value: "3", isFixed: true },],
      [{ value: "4", isFixed: true }, { value: "2", isFixed: true }, { value: "6", isFixed: true }, { value: "8", isFixed: true }, { value: "5", isFixed: true }, { value: "3", isFixed: true }, { value: "7", isFixed: true }, { value: "9", isFixed: true }, { value: "1", isFixed: true },],
      [{ value: "7", isFixed: true }, { value: "1", isFixed: true }, { value: "3", isFixed: true }, { value: "9", isFixed: true }, { value: "2", isFixed: true }, { value: "4", isFixed: true }, { value: "8", isFixed: true }, { value: "5", isFixed: true }, { value: "6", isFixed: true },],
      [{ value: "9", isFixed: true }, { value: "6", isFixed: true }, { value: "1", isFixed: true }, { value: "5", isFixed: true }, { value: "3", isFixed: true }, { value: "7", isFixed: true }, { value: "2", isFixed: true }, { value: "8", isFixed: true }, { value: "4", isFixed: true },],
      [{ value: "2", isFixed: true }, { value: "8", isFixed: true }, { value: "7", isFixed: true }, { value: "4", isFixed: true }, { value: "1", isFixed: true }, { value: "9", isFixed: true }, { value: "6", isFixed: true }, { value: "3", isFixed: true }, { value: "5", isFixed: true },],
      [{ value: "3", isFixed: true }, { value: "4", isFixed: true }, { value: "5", isFixed: true }, { value: "2", isFixed: true }, { value: "8", isFixed: true }, { value: "6", isFixed: true }, { value: "1", isFixed: true }, { value: "7", isFixed: true }, { value: "9", isFixed: true },]
    ] as SudokuTable;
    table[7][4].value = '';
    table[7][4].isFixed = false;
    return of(table);
  }

  private getFileName(difficultyLevel: DifficultyLevel): string {
    switch (difficultyLevel) {
      case DifficultyLevel.Easy:
        return 'easy.json';
      case DifficultyLevel.Medium:
        return 'medium.json';
      case DifficultyLevel.Hard:
        return 'hard.json';
      default:
        return '';
    }
  }

  private chooseRandomGame(games: number[][][]): number[][] {
    const noOfGames = games.length;
    const randomGameIndex = Math.floor(Math.random() * noOfGames);
    return games[randomGameIndex];
  }

  private convertNumbersArrayToModel(game: number[][]): SudokuTable {
    const sudokuTable: SudokuTable = [];
    for (let i = 0; i < game.length; i++) {
      sudokuTable.push([]);
      for (let j = 0; j < game[i].length; j++) {
        if (game[i][j]) {
          sudokuTable[i].push({
            value: game[i][j].toString(),
            isFixed: true,
            isWrong: false
          })
        } else {
          sudokuTable[i].push({ isFixed: false, isWrong: false })
        }
      }
    }
    return sudokuTable;
  }
}
