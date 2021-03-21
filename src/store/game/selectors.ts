import { RootState } from '../index';
import {
  Coordinate, CellState, Piece, RouteItem, Route, PlayerType, GameMode,
} from '../../types';
import { getCellIndex } from '../../utils/common';

export const selectGameState = (state: RootState) => state.game;

export const selectCells = (state: RootState) => state.game.cells;

export const getSelectPieceState = (
  pieceIndex: string,
) => (state: RootState): Piece | null => {
  const cell = state.game.cells[pieceIndex];

  return cell ? cell.piece : null;
};

export const selectSelectedPieceCoordinates = (
  state: RootState,
): Coordinate | null => state.game.selectedPieceCoordinate;

export const getSelectIsPieceRisen = (
  pieceIndex: string,
) => (state: RootState): boolean => {
  const piece = getSelectPieceState(pieceIndex)(state);
  const selectedPieceCoordinates = selectSelectedPieceCoordinates(state);

  if (
    piece === null
    || selectedPieceCoordinates === null
  ) {
    return false;
  }

  return pieceIndex === getCellIndex(
    selectedPieceCoordinates,
  );
};

export const getSelectCell = (
  cellIndex: string,
) => (state: RootState): CellState => state.game.cells[cellIndex];

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

export const getSelectIsPieceAvailable = (coordinate: Coordinate) => (
  state: RootState,
): boolean => state.game.availableTurnPieces.some((availablePieceCoordinate) => {
  const {
    colIndex: availablePieceColIndex,
    rowIndex: availablePieceRowIndex,
  } = availablePieceCoordinate;
  const { colIndex, rowIndex } = coordinate;

  return availablePieceRowIndex === rowIndex && availablePieceColIndex === colIndex;
});
