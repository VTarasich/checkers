import { RootState } from '../index';

export const getSelectPieceState = (
  pieceIndex: string,
) => (state: RootState) => state.game.pieces[pieceIndex];

export const getSelectCellState = (
  pieceIndex: string,
) => (state: RootState) => state.game.cells[pieceIndex];
