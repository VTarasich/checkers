import { createDefaultGameState } from '../utils';
import { togglePiece } from '../game-utils';

const RISE_PIECE = 'game/RISE_PIECE';

interface RisePieceAction {
  type: typeof RISE_PIECE;
  payload: string;
}

export const risePiece = (pieceIndex: string): RisePieceAction => ({
  type: RISE_PIECE,
  payload: pieceIndex,
});

export const selectGameState = (state: any) => state.game;

type GameAction = RisePieceAction;

const defaultGameState = createDefaultGameState();
export const game = (state = defaultGameState, action: GameAction) => {
  if (action.type === RISE_PIECE) {
    return togglePiece(state, action.payload);
  }
  return state;
};
