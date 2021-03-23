import {
  CellsMap, Coordinate, Direction, DirectionOffset,
} from '../types';
import { getCellIndex, getOffsetCoordinate } from './common';

const directionOffsets = {
  'top-right': {
    rowOffset: -1,
    colOffset: 1,
  },
  'top-left': {
    rowOffset: -1,
    colOffset: -1,
  },
  'bottom-right': {
    rowOffset: 1,
    colOffset: 1,
  },
  'bottom-left': {
    rowOffset: 1,
    colOffset: -1,
  },
};

export const getDirectionOffset = (
  direction: Direction,
): DirectionOffset => directionOffsets[direction];

export const getAvailableDirections = (
  state: CellsMap,
  coordinate: Coordinate,
): Direction[] => Object.entries(directionOffsets)
  .filter(([direction, directionOffset]) => {
    const { piece } = state[getCellIndex(coordinate)];

    if (piece === null) {
      return false;
    }

    const availableCell = state[getCellIndex(getOffsetCoordinate(coordinate, directionOffset))];

    if (!availableCell) {
      return false;
    }

    // piece exists in current direction
    if (availableCell.piece) {
      return availableCell.piece.color !== piece.color;
    }

    // cell is empty in current direction
    // todo: queen piece
    if (piece.color === 'black') {
      return direction === 'bottom-left' || direction === 'bottom-right';
    }

    return direction === 'top-left' || direction === 'top-right';
  }).map(([direction]) => direction as Direction);
