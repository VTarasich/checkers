import { createDefaultCellsState } from '../../utils/common';
import {
  CellsMap, Coordinate, GameMode, PlayerType, Route,
} from '../../types';
import {
  GameAction,
  HIT_PIECE,
  HOVER_CELL,
  MOVE_PIECE,
  NEW_GAME,
  PUT_PIECE,
  RISE_PIECE,
  SET_STATE,
  UNDO,
} from './actions';
import {
  getAvailableTurnPieces,
  getAvailableRoutes,
  getMandatoryTurnPieceAfterHitCoordinate,
  getNextPlayer,
  getStateWithHitPiece,
  getStateWithMovedPiece,
} from '../../utils/game';
import getHistoryEntry from '../../utils/history';

export type GameState = {
  cells: CellsMap,
  availableTurnRoutes: Route[],
  availableTurnPieces: Coordinate[],
  selectedPieceCoordinate: Coordinate | null,
  hoveredCellCoordinate: Coordinate | null,
  mandatoryTurnPiece: Coordinate | null,
  history: Partial<GameState>[],
  currentPlayer: PlayerType,
  mode: GameMode,
};

const initialPlayer = 'white';
const defaultCellsState = createDefaultCellsState();
const defaultAvailableTurnCells: Route[] = [];
const initialAvailableTurnPieces = getAvailableTurnPieces(defaultCellsState, initialPlayer);

const defaultGameState: GameState = {
  cells: defaultCellsState,
  availableTurnRoutes: defaultAvailableTurnCells,
  availableTurnPieces: initialAvailableTurnPieces,
  selectedPieceCoordinate: null,
  hoveredCellCoordinate: null,
  mandatoryTurnPiece: null,
  history: [],
  currentPlayer: initialPlayer,
  mode: 'PvP',
};

export const reducer = (state = defaultGameState, action: GameAction): GameState => {
  switch (action.type) {
    case PUT_PIECE: {
      return {
        ...state,
        selectedPieceCoordinate: null,
        availableTurnRoutes: defaultAvailableTurnCells,
      };
    }

    case RISE_PIECE: {
      const availableTurnRoutes = getAvailableRoutes(state.cells, action.payload);
      return {
        ...state,
        selectedPieceCoordinate: action.payload,
        availableTurnRoutes,
      };
    }

    case HOVER_CELL: {
      const availableTurnRoutes = action.payload
        ? getAvailableRoutes(state.cells, action.payload)
        : defaultAvailableTurnCells;
      return {
        ...state,
        hoveredCellCoordinate: action.payload,
        availableTurnRoutes,
      };
    }

    case MOVE_PIECE: {
      const { fromCoordinate, toCoordinate } = action.payload;
      const nextPlayer = getNextPlayer(state.currentPlayer, false);
      const updatedState = getStateWithMovedPiece(state.cells, fromCoordinate, toCoordinate);
      const availableTurnPieces = getAvailableTurnPieces(updatedState, nextPlayer);

      return {
        ...state,
        cells: updatedState,
        selectedPieceCoordinate: null,
        mandatoryTurnPiece: null,
        history: [getHistoryEntry(state), ...state.history],
        availableTurnRoutes: defaultAvailableTurnCells,
        availableTurnPieces,
        currentPlayer: nextPlayer,
      };
    }

    case HIT_PIECE: {
      const { fromCoordinate, hitCoordinate, toCoordinate } = action.payload;
      const stateAfterHit = getStateWithHitPiece(
        state.cells,
        fromCoordinate,
        hitCoordinate,
        toCoordinate,
      );
      const mandatoryTurnPiece = getMandatoryTurnPieceAfterHitCoordinate(
        stateAfterHit,
        toCoordinate,
      );
      const nextPlayer = getNextPlayer(state.currentPlayer, mandatoryTurnPiece !== null);
      const updatedState = getStateWithHitPiece(
        state.cells,
        fromCoordinate,
        hitCoordinate,
        toCoordinate,
      );
      const availableTurnPieces = mandatoryTurnPiece !== null
        ? [mandatoryTurnPiece]
        : getAvailableTurnPieces(updatedState, nextPlayer);

      return {
        ...state,
        cells: updatedState,
        selectedPieceCoordinate: null,
        mandatoryTurnPiece,
        availableTurnPieces,
        history: [getHistoryEntry(state), ...state.history],
        availableTurnRoutes: defaultAvailableTurnCells,
        currentPlayer: nextPlayer,
      };
    }

    case UNDO: {
      const lastState = state.history[0];

      return {
        ...state,
        ...lastState,
        history: state.history.slice(1),
      };
    }

    case NEW_GAME: {
      return {
        ...defaultGameState,
        mode: action.payload,
      };
    }

    case SET_STATE: {
      return action.payload;
    }

    default:
      return state;
  }
};
