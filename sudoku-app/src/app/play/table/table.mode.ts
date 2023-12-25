export interface TileValue {
    value?: string;
    isFixed: boolean;
}

export interface TableValues extends Array<Array<TileValue>> { }