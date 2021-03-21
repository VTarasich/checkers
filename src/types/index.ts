export type Color = 'white' | 'black';

export interface Piece {
  color: Color;
  isRisen: boolean;
}

export interface CellState {
  piece: Piece | null;
}

export type Coordinate = {
  rowIndex: number;
  colIndex: number;
}

export type DirectionOffset = {
  rowOffset: number,
  colOffset: number,
}

export type CellsMap = {
  [key: string]: CellState;
}

export interface RouteItem {
  coordinate: Coordinate;
  cell: CellState;
}

export type Route = RouteItem[];

export type Direction = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';

export type GameMode = 'PvP' | 'AI';

export type PlayerType = Color;
