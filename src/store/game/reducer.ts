import { createDefaultCellsState, createDefaultPiecesState } from '../../utils';
import { togglePiece } from '../../game-utils';
import { CellsState, PiecesState } from '../../types';
import { GameAction, RISE_PIECE } from './actions';

export interface GameState {
  pieces: PiecesState;
  cells: CellsState;
}

const defaultGameState: GameState = {
  pieces: createDefaultPiecesState(),
  cells: createDefaultCellsState(),
};

export const reducer = (state = defaultGameState, action: GameAction): GameState => {
  if (action.type === RISE_PIECE) {
    return {
      ...state,
      pieces: togglePiece(state.pieces, action.payload),
    };
  }
  return state;
};
