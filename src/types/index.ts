export type HighlightType = 'available' | 'none';

export interface Piece {
  color: 'white' | 'black';
  isRisen: boolean;
}

export interface GameCell {
  piece: Piece | null;
  highlight: HighlightType;
}

export type GameState = {
  [key: string]: GameCell
}
