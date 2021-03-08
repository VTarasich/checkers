import { GameState } from './types';

export const x = 1;

export const togglePiece = (state: GameState, pieceIndex: string) => ({
  ...state,
  [pieceIndex]: {
    ...state[pieceIndex],
    piece: {
      ...state[pieceIndex].piece,
      isRisen: !state[pieceIndex].piece!.isRisen,
    },
  },
});
