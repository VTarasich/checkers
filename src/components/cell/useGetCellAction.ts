import { useDispatch, useSelector } from 'react-redux';
import React from 'react';

import { Coordinate } from '../../types';
import { selectAvailableTurnCells, selectSelectedPieceCoordinate } from '../../store/game/selectors';
import { getRouteWithCell } from '../../utils/game';
import { hitPiece, movePiece } from '../../store/game/actions';

const useGetCellAction = (coordinate: Coordinate): () => void => {
  const dispatch = useDispatch();
  const availableTurnCells = useSelector(selectAvailableTurnCells);
  const selectedPieceCoordinates = useSelector(selectSelectedPieceCoordinate);

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

export default useGetCellAction;
