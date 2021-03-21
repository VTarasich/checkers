import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectCells, selectCurrentPlayer, selectMandatoryTurnPiece } from '../../store/game/selectors';
import { getAvailableRoutes, getAvailableTurnPieces } from '../../utils/game';
import { getRandomInt } from '../../utils/common';
import { hitPiece, movePiece } from '../../store/game/actions';

function usePrevious<ValueType>(value: ValueType): ValueType | undefined {
  const ref = React.useRef<ValueType>();

  React.useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}

export const AI_PLAYER = 'black';

const DummyAI: React.FC = () => {
  const dispatch = useDispatch();

  const cells = useSelector(selectCells);
  const currentPlayer = useSelector(selectCurrentPlayer);
  const mandatoryTurnPiece = useSelector(selectMandatoryTurnPiece);
  const previousPlayer = usePrevious(currentPlayer);
  const previousMandatoryTurnPiece = usePrevious(mandatoryTurnPiece);

  React.useEffect(() => {
    console.log('IM ALIVE');

    return () => {
      console.log('I`LL BE BACK');
    };
  }, []);

  React.useEffect(() => {
    if (currentPlayer !== previousPlayer && currentPlayer === AI_PLAYER) {
      console.log('MY TURN!');

      const availableTurnPieces = getAvailableTurnPieces(cells, AI_PLAYER);

      if (!availableTurnPieces.length) {
        console.log('>>>', 'OOOPS, I GIVE UP');

        return;
      }

      console.log('>>>', 'I CAN MOVE: ', availableTurnPieces);
      const chosenPiece = availableTurnPieces[getRandomInt(0, availableTurnPieces.length)];

      console.log('>>>', 'I HAVE DECIDED TO MOVE: ', chosenPiece);

      const availableRoutes = getAvailableRoutes(cells, chosenPiece);

      console.log('>>>', 'I CAN MOVE IT TO: ', availableRoutes);

      const chosenRoute = availableRoutes[getRandomInt(0, availableRoutes.length)];

      console.log('>>>', 'I CHOOSE TO GO THIS WAY: ', chosenRoute);

      if (chosenRoute.length > 1) {
        const hitPieceCoordinate = chosenRoute[0].coordinate;
        const cellAfterHitCoordinate = chosenRoute[1].coordinate;

        console.log('>>>', 'HEHE! I WILL HIT: ', hitPieceCoordinate);

        dispatch(hitPiece(chosenPiece, hitPieceCoordinate, cellAfterHitCoordinate));
      } else {
        const moveCoordinate = chosenRoute[0].coordinate;
        console.log('>>>', 'MOVING TO: ', moveCoordinate);
        dispatch(movePiece(chosenPiece, moveCoordinate));
      }
    }

    if (
      previousMandatoryTurnPiece !== mandatoryTurnPiece
      && mandatoryTurnPiece !== null
      && currentPlayer === AI_PLAYER
    ) {
      console.log('I`M MACHINEEE! I HIT AGAIN: ', mandatoryTurnPiece);

      const availableRoutes = getAvailableRoutes(cells, mandatoryTurnPiece);
      const chosenRoute = availableRoutes[getRandomInt(0, availableRoutes.length)];

      console.log('>>>', 'I CHOOSE TO GO AND HIT THIS WAY: ', chosenRoute);

      if (chosenRoute.length > 1) {
        const hitPieceCoordinate = chosenRoute[0].coordinate;
        const cellAfterHitCoordinate = chosenRoute[1].coordinate;

        console.log('>>>', 'HEHE! I WILL HIT: ', hitPieceCoordinate);

        dispatch(hitPiece(mandatoryTurnPiece, hitPieceCoordinate, cellAfterHitCoordinate));
      } else {
        console.log('>>>', 'OOOPS! SOMETHING WENT WRONG');
      }
    }
  }, [
    dispatch, cells, currentPlayer, previousPlayer, previousMandatoryTurnPiece, mandatoryTurnPiece,
  ]);

  return null;
};

export default DummyAI;
