import { Coordinate, CellState, GameMode } from '../../types';
import { GameState } from './reducer';

export const RISE_PIECE = 'game/RISE_PIECE';
export const PUT_PIECE = 'game/PUT_PIECE';
export const MOVE_PIECE = 'game/MOVE_PIECE';
export const HOVER_CELL = 'game/HOVER_CELL';
export const HIT_PIECE = 'game/HIT_PIECE';
export const NEW_GAME = 'game/NEW_GAME';
export const SET_STATE = 'game/SET_STATE';
export const UNDO = 'game/UNDO';

interface RisePieceAction {
  type: typeof RISE_PIECE;
  payload: Coordinate;
}

interface PutPieceAction {
  type: typeof PUT_PIECE;
  payload: Coordinate;
}

interface MovePieceAction {
  type: typeof MOVE_PIECE;
  payload: {
    fromCoordinate: Coordinate,
    toCoordinate: Coordinate,
  };
}

interface HoverPieceAction {
  type: typeof HOVER_CELL;
  payload: Coordinate | null;
}

interface HitPieceAction {
  type: typeof HIT_PIECE;
  payload: {
    fromCoordinate: Coordinate,
    hitCoordinate: Coordinate,
    toCoordinate: Coordinate,
  };
}

interface UndoAction {
  type: typeof UNDO;
}

interface NewGameAction {
  type: typeof NEW_GAME;
  payload: GameMode;
}

interface SetStateAction {
  type: typeof SET_STATE;
  payload: GameState;
}

export const risePiece = (coordinate: Coordinate): RisePieceAction => ({
  type: RISE_PIECE,
  payload: coordinate,
});

export const putPiece = (coordinate: Coordinate): PutPieceAction => ({
  type: PUT_PIECE,
  payload: coordinate,
});

export const movePiece = (
  fromCoordinate: Coordinate,
  toCoordinate: Coordinate,
): MovePieceAction => ({
  type: MOVE_PIECE,
  payload: {
    fromCoordinate,
    toCoordinate,
  },
});

export const hoverPiece = (
  coordinate: Coordinate | null,
): HoverPieceAction => ({
  type: HOVER_CELL,
  payload: coordinate,
});

export const hitPiece = (
  fromCoordinate: Coordinate,
  hitCoordinate: Coordinate,
  toCoordinate: Coordinate,
): HitPieceAction => ({
  type: HIT_PIECE,
  payload: {
    fromCoordinate,
    hitCoordinate,
    toCoordinate,
  },
});

export const undo = (): UndoAction => ({
  type: UNDO,
});

export const startGame = (payload: GameMode): NewGameAction => ({
  type: NEW_GAME,
  payload,
});

export const setGameState = (payload: GameState): SetStateAction => ({
  type: SET_STATE,
  payload,
});

export type GameAction =
  | RisePieceAction
  | PutPieceAction
  | MovePieceAction
  | HoverPieceAction
  | HitPieceAction
  | UndoAction
  | NewGameAction
  | SetStateAction;
