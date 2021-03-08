import { PiecesState } from './types';

export const x = 1;

export const togglePiece = (state: PiecesState, pieceIndex: string): PiecesState => {
  const piece = state[pieceIndex];

  if (piece === undefined || piece === null) {
    console.warn('No piece found by index ', pieceIndex);
    return state;
  }

  return {
    ...state,
    [pieceIndex]: {
      ...piece,
      isRisen: !piece.isRisen,
    },
  };
};
