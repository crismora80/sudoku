import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { DifficultyLevel, SudokuTable } from '../table/table.model';

interface PostBody {
  games: number[][][],
  filename: string
}

@Injectable()
export class GamesFileParserService {
  BASE_URL = './assets/data/';
  WRITE_TO_FILE_URL = 'http://localhost:3000/api/writeToFile';

  constructor(private http: HttpClient) { }

  getGame(difficultyLevel: DifficultyLevel): Observable<SudokuTable> {
    const fileName = this.getFileName(difficultyLevel);
    return this.readFile(fileName)
      .pipe(map((result: number[][][]) => {
        const randomGame = this.chooseRandomGame(result);
        return this.convertNumbersArrayToModel(randomGame);
      }));
  }

  writeGames(sudokuTables: SudokuTable[], filename: string): Observable<any> {
    const games = this.convertModelToNumbersArray(sudokuTables);
    return this.http.post(this.WRITE_TO_FILE_URL, { games, filename });
  }

  private readFile(fileName: string): Observable<number[][][]> {
    return this.http.get<any>(fileName);
  }

  private getFileName(difficultyLevel: DifficultyLevel): string {
    switch (difficultyLevel) {
      case DifficultyLevel.Easy:
        return this.BASE_URL + 'easy.json';
      case DifficultyLevel.Medium:
        return this.BASE_URL + 'medium.json';
      case DifficultyLevel.Hard:
        return this.BASE_URL + 'hard.json';
      default:
        return '';
    }
  }

  private chooseRandomGame(games: number[][][]): number[][] {
    const noOfGames = games.length;
    const randomGameIndex = Math.random() * noOfGames;
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
            isFixed: true
          })
        } else {
          sudokuTable[i].push({ isFixed: false })
        }
      }
    }
    return sudokuTable;
  }

  private convertModelToNumbersArray(sudokuTables: SudokuTable[]): number[][][] {
    const numbersArray: number[][][] = [];
    for (let i = 0; i < sudokuTables.length; i++) {
      numbersArray.push([]);
      for (let j = 0; j < sudokuTables[i].length; j++) {
        numbersArray[i].push([]);
        for (let k = 0; k < sudokuTables[i][j].length; k++) {
          numbersArray[i][j].push(sudokuTables[i][j][k].value ? Number.parseInt(sudokuTables[i][j][k].value!) : 0);
        }
      }
    }
    return numbersArray;
  }
}
