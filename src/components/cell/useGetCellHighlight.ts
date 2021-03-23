import { useSelector } from 'react-redux';

import { Coordinate } from '../../types';
import { getSelectPieceState, selectAvailableTurnCells } from '../../store/game/selectors';
import { getRouteWithCell } from '../../utils/game';
import useIsCellUnderHit from '../../hooks/useIsCellUnderHit';

import { CellHighLight } from './Cell.styled';

const useGetCellHighlight = (coordinate: Coordinate): CellHighLight => {
  const currentCellPiece = useSelector(getSelectPieceState(coordinate));
  const availableTurnCells = useSelector(selectAvailableTurnCells);
  const availableRoute = getRouteWithCell(availableTurnCells, coordinate);

  const isHitRoute = useIsCellUnderHit(coordinate);

  if (!availableRoute) {
    return 'none';
  }

  if (isHitRoute) {
    return currentCellPiece ? 'hit' : 'available';
  }

  return 'available';
};

export default useGetCellHighlight;
