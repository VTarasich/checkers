import { RootState } from '../index';
import {
  Coordinate, Piece, Route, PlayerType, GameMode,
} from '../../types';
import { areCoordinatesEqual, getCellIndex } from '../../utils/common';

export const selectGameState = (state: RootState) => state.game;

export const selectCells = (state: RootState) => state.game.cells;

export const getSelectPieceState = (
  coordinate: Coordinate,
) => (state: RootState): Piece | null => {
  const cell = state.game.cells[getCellIndex(coordinate)];

  return cell ? cell.piece : null;
};

export const selectSelectedPieceCoordinate = (
  state: RootState,
): Coordinate | null => state.game.selectedPieceCoordinate;

export const getSelectIsPieceRisen = (
  coordinate: Coordinate,
) => (state: RootState): boolean => {
  const piece = getSelectPieceState(coordinate)(state);
  const selectedPieceCoordinate = selectSelectedPieceCoordinate(state);

  if (
    piece === null
    || selectedPieceCoordinate === null
  ) {
    return false;
  }

  return areCoordinatesEqual(
    coordinate,
    selectedPieceCoordinate,
  );
};

export const selectAvailableTurnCells = (
  state: RootState,
): Route[] => state.game.availableTurnRoutes;

export const selectCurrentPlayer = (
  state: RootState,
): PlayerType => state.game.currentPlayer;

export const selectGameMode = (
  state: RootState,
): GameMode => state.game.mode;

export const selectMandatoryTurnPiece = (
  state: RootState,
): Coordinate | null => state.game.mandatoryTurnPiece;

export const getSelectIsPieceAvailableForTurn = (coordinate: Coordinate) => (
  state: RootState,
): boolean => state.game.availableTurnPieces
  .some((availablePieceCoordinate) => areCoordinatesEqual(coordinate, availablePieceCoordinate));
