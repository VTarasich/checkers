export const RISE_PIECE = 'game/RISE_PIECE';

interface RisePieceAction {
  type: typeof RISE_PIECE;
  payload: string;
}

export const risePiece = (pieceIndex: string): RisePieceAction => ({
  type: RISE_PIECE,
  payload: pieceIndex,
});

export type GameAction = RisePieceAction;
