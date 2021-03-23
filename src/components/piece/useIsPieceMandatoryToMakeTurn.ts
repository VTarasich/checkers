import { useSelector } from 'react-redux';

import { Coordinate } from '../../types';
import {
  selectMandatoryTurnPiece,
} from '../../store/game/selectors';
import { areCoordinatesEqual } from '../../utils/common';

const useIsPieceMandatoryToMakeTurn = (coordinate: Coordinate): boolean => {
  const mandatoryTurnPiece = useSelector(selectMandatoryTurnPiece);
  return mandatoryTurnPiece !== null
    && areCoordinatesEqual(mandatoryTurnPiece, coordinate);
};

export default useIsPieceMandatoryToMakeTurn;
