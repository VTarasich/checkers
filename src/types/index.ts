export type HighlightType = 'available' | 'none';

export interface Piece {
  color: 'white' | 'black';
  isRisen: boolean;
}

export interface Cell {
  highlight: 'default' | 'none';
}

export interface PiecesState {
  [key: string]: Piece | null;
}

export interface CellsState {
  [key: string]: Cell;
}
