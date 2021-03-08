import {
  Cell, CellsState, Piece, PiecesState,
} from './types';

type RowTuple = [boolean, boolean, boolean, boolean, boolean, boolean, boolean, boolean];
type BoardTuple = [RowTuple, RowTuple, RowTuple, RowTuple, RowTuple, RowTuple, RowTuple, RowTuple];

export const createRowSchema = (hasOffset = false): RowTuple => Array.from(Array(8))
  .map((_, i) => (hasOffset ? i % 2 === 1 : i % 2 === 0)) as RowTuple;

export const createBoardSchema = ():BoardTuple => Array.from(Array(8))
  .map((_, i) => createRowSchema(i % 2 === 0)) as BoardTuple;

export const getCellIndex = (rowIndex: number, colIndex: number): string => `${rowIndex}-${colIndex}`;

const getDefaultPieceByRowIndex = (rowIndex: number): Piece | null => {
  if (rowIndex < 3) {
    return {
      color: 'white',
      isRisen: false,
    };
  }

  if (rowIndex > 4) {
    return {
      color: 'black',
      isRisen: false,
    };
  }

  return null;
};

const createDefaultPiecesRow = (
  rowIndex: number,
  row: boolean[],
) => row.reduce((rowResult, cell, colIndex) => {
  // skip white cells
  if (!cell) {
    return rowResult;
  }

  return {
    ...rowResult,
    [getCellIndex(rowIndex, colIndex)]: getDefaultPieceByRowIndex(rowIndex),
  };
}, {} as PiecesState);

const createDefaultCellsRow = (
  rowIndex: number,
  row: boolean[],
) => row.reduce((rowResult, cell, colIndex) => {
  // skip white cells
  if (!cell) {
    return rowResult;
  }

  return {
    ...rowResult,
    [getCellIndex(rowIndex, colIndex)]: {
      highlight: 'none',
    } as Cell,
  };
}, {} as CellsState);

export const createDefaultCellsState = (): CellsState => {
  const defaultSchema = createBoardSchema();

  return defaultSchema
    .reduce((gameState, row, rowIndex) => ({
      ...gameState,
      ...createDefaultCellsRow(rowIndex, row),
    }), {} as CellsState);
};

export const createDefaultPiecesState = (): PiecesState => {
  const defaultSchema = createBoardSchema();

  return defaultSchema
    .reduce((gameState, row, rowIndex) => ({
      ...gameState,
      ...createDefaultPiecesRow(rowIndex, row),
    }), {} as PiecesState);
};
