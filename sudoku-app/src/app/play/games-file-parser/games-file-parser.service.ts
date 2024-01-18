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

  writeGames(sudokuTables: SudokuTable[], filename: string): Observable<any> {
    const games = this.convertModelToNumbersArray(sudokuTables);
    return this.http.post(this.WRITE_TO_FILE_URL, { games, filename } as PostBody);
  }

  readGames(fileName: string): Observable<number[][][]> {
    return this.http.get<any>(this.BASE_URL + fileName);
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
