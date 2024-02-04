export interface TileValue {
    value?: string;
    isFixed: boolean;
    isWrong?: boolean;
}

export interface SudokuTable extends Array<Array<TileValue>> { }

export enum DifficultyLevel {
    Easy,
    Medium,
    Hard
}