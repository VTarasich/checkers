import { useSelector } from 'react-redux';
import { Coordinate } from '../types';
import { selectAvailableTurnCells } from '../store/game/selectors';
import { getRouteWithCell } from '../utils/game';

const useIsCellUnderHit = (coordinate: Coordinate): boolean => {
  const availableTurnCells = useSelector(selectAvailableTurnCells);
  const availableRoute = getRouteWithCell(availableTurnCells, coordinate);

  if (!availableRoute) {
    return false;
  }

  return availableRoute.some((routeItem) => routeItem.cell.piece);
};

export default useIsCellUnderHit;
