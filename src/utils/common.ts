import {
  Coordinate,
  CellsMap,
  CellState,
  Piece, DirectionOffset,
} from '../types';

export const BOARD_SIZE = 8;

export const createRowSchema = (hasOffset = false): boolean[] => Array.from(Array(BOARD_SIZE))
  .map((_, i) => (hasOffset ? i % 2 === 1 : i % 2 === 0));

export const createBoardSchema = (): boolean[][] => Array.from(Array(BOARD_SIZE))
  .map((_, i) => createRowSchema(i % 2 === 0));

export const getCellIndex = ({ rowIndex, colIndex }: Coordinate): string => `${rowIndex}-${colIndex}`;

export const getOffsetCoordinate = (
  { rowIndex, colIndex }: Coordinate,
  { rowOffset, colOffset }: DirectionOffset,
): Coordinate => ({
  rowIndex: rowIndex + rowOffset,
  colIndex: colIndex + colOffset,
});

export const getCellCoordinateFromIndex = (index: string): Coordinate => {
  const [rowIndex, colIndex] = index.split('-');

  return {
    colIndex: Number(colIndex),
    rowIndex: Number(rowIndex),
  };
};

export const areCoordinatesEqual = (
  coordinate: Coordinate,
  coordinateToCompare: Coordinate,
): boolean => {
  const { rowIndex, colIndex } = coordinate;
  const { rowIndex: rowIndexToCompare, colIndex: colIndexToCompare } = coordinateToCompare;

  return rowIndex === rowIndexToCompare && colIndex === colIndexToCompare;
};

const getDefaultPieceByRowIndex = (rowIndex: number): Piece | null => {
  if (rowIndex < 3) {
    return {
      color: 'black',
      isRisen: false,
      isQueen: false,
    };
  }

  if (rowIndex > 4) {
    return {
      color: 'white',
      isRisen: false,
      isQueen: false,
    };
  }

  return null;
};

const createDefaultCellsRow = (
  rowIndex: number,
  row: boolean[],
) => row.reduce<CellsMap>((rowResult, cell, colIndex) => {
  // skip white cells
  if (!cell) {
    return rowResult;
  }

  return {
    ...rowResult,
    [getCellIndex({ rowIndex, colIndex })]: {
      piece: getDefaultPieceByRowIndex(rowIndex),
    } as CellState,
  };
}, {});

export const createDefaultCellsState = (): CellsMap => {
  const defaultSchema = createBoardSchema();

  return defaultSchema
    .reduce<CellsMap>((gameState, row, rowIndex) => ({
      ...gameState,
      ...createDefaultCellsRow(rowIndex, row),
    }), {});
};

export const getRandomInt = (min: number, max: number): number => (
  Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min)) + Math.ceil(min))
);
