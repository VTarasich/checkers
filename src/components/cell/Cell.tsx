import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { $Cell, CellHighLight } from './Cell.styled';
import Piece from '../piece/Piece';
import {
  getSelectPieceState, selectAvailableTurnCells, selectSelectedPieceCoordinates,
} from '../../store/game/selectors';
import { getCellIndex } from '../../utils/common';
import { hitPiece, movePiece } from '../../store/game/actions';
import { Coordinate } from '../../types';
import { getRouteWithCell } from '../../utils/game';

interface CellProps {
  coordinate: Coordinate,
  hasOffset: boolean;
}

export const useIsPieceHit = (coordinate: Coordinate): boolean => {
  const availableTurnCells = useSelector(selectAvailableTurnCells);
  const availableRoute = getRouteWithCell(availableTurnCells, coordinate);

  if (!availableRoute) {
    return false;
  }

  return availableRoute.some((routeItem) => routeItem.cell.piece);
};

const useGetCellHighlight = (coordinate: Coordinate): CellHighLight => {
  const currentCellPiece = useSelector(getSelectPieceState(getCellIndex(coordinate)));
  const availableTurnCells = useSelector(selectAvailableTurnCells);
  const availableRoute = getRouteWithCell(availableTurnCells, coordinate);

  const isHitRoute = useIsPieceHit(coordinate);

  if (!availableRoute) {
    return 'none';
  }

  if (isHitRoute) {
    return currentCellPiece ? 'hit' : 'available';
  }

  return 'available';
};

export const useGetCellAction = (coordinate: Coordinate): () => void => {
  const dispatch = useDispatch();
  const availableTurnCells = useSelector(selectAvailableTurnCells);
  const selectedPieceCoordinates = useSelector(selectSelectedPieceCoordinates);

  const availableRoute = getRouteWithCell(availableTurnCells, coordinate);

  return React.useCallback(() => {
    if (!availableRoute || !selectedPieceCoordinates) {
      // no available turns to this cell
      return;
    }

    const hitPieceRouteItem = availableRoute.find((routeItem) => routeItem.cell.piece);

    if (hitPieceRouteItem) {
      dispatch(hitPiece(
        selectedPieceCoordinates,
        hitPieceRouteItem.coordinate,
        coordinate,
      ));
    } else {
      dispatch(movePiece(
        selectedPieceCoordinates,
        coordinate,
      ));
    }
  }, [dispatch, selectedPieceCoordinates, coordinate, availableRoute]);
};

const Cell: React.FC<CellProps> = ({ coordinate, hasOffset }) => {
  const highlight = useGetCellHighlight(coordinate);
  const onMouseUp = useGetCellAction(coordinate);

  return (
    <$Cell
      onMouseUp={onMouseUp}
      hasOffset={hasOffset}
      highlight={highlight}
    >
      <Piece coordinate={coordinate} />
    </$Cell>
  );
};

export default Cell;
