import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectCells, selectCurrentPlayer, selectMandatoryTurnPiece } from '../../store/game/selectors';
import { getAvailableRoutes, getAvailableTurnPieces, isRouteWithHitPiece } from '../../utils/game';
import { getRandomInt } from '../../utils/common';
import { hitPiece, movePiece } from '../../store/game/actions';
import { Coordinate, Route } from '../../types';
import usePrevious from '../../hooks/usePrevious';

export const AI_PLAYER = 'black';

const AI_MOVE_DELAY_MS = 500;

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

  const hitPieceAction = React.useCallback((pieceCoordinate: Coordinate, hitRoute: Route) => {
    const hitPieceCoordinate = hitRoute[hitRoute.length - 2].coordinate;
    const cellAfterHitCoordinate = hitRoute[hitRoute.length - 1].coordinate;

    console.log('HEHE! I WILL HIT: ', hitPieceCoordinate);

    window.setTimeout(() => {
      dispatch(hitPiece(pieceCoordinate, hitPieceCoordinate, cellAfterHitCoordinate));
    }, AI_MOVE_DELAY_MS);
  }, [dispatch]);

  const movePieceAction = React.useCallback((pieceCoordinate: Coordinate, moveRoute: Route) => {
    const moveCoordinate = moveRoute[getRandomInt(0, moveRoute.length)].coordinate;

    console.log('MOVING TO: ', moveCoordinate);

    window.setTimeout(() => {
      dispatch(movePiece(pieceCoordinate, moveCoordinate));
    }, AI_MOVE_DELAY_MS);
  }, [dispatch]);

  React.useEffect(() => {
    if (currentPlayer !== previousPlayer && currentPlayer === AI_PLAYER) {
      console.log('MY TURN!');

      const availableTurnPieces = getAvailableTurnPieces(cells, AI_PLAYER);

      if (!availableTurnPieces.length) {
        console.log('OOOPS, I GIVE UP');

        return;
      }

      console.log('I CAN MOVE: ', availableTurnPieces);
      const chosenPiece = availableTurnPieces[getRandomInt(0, availableTurnPieces.length)];

      console.log('I HAVE DECIDED TO MOVE: ', chosenPiece);

      const availableRoutes = getAvailableRoutes(cells, chosenPiece);

      console.log('I CAN MOVE IT TO: ', availableRoutes);

      const chosenRoute = availableRoutes[getRandomInt(0, availableRoutes.length)];

      console.log('I CHOOSE TO GO THIS WAY: ', chosenRoute);

      if (chosenRoute.length > 1) {
        hitPieceAction(chosenPiece, chosenRoute);
      } else {
        movePieceAction(chosenPiece, chosenRoute);
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

      console.log('I CHOOSE TO GO AND HIT THIS WAY: ', chosenRoute);

      if (isRouteWithHitPiece(chosenRoute)) {
        hitPieceAction(mandatoryTurnPiece, chosenRoute);
      } else {
        console.log('OOOPS! SOMETHING WENT WRONG');
      }
    }
  }, [
    dispatch,
    cells,
    currentPlayer,
    previousPlayer,
    previousMandatoryTurnPiece,
    mandatoryTurnPiece,
    hitPieceAction,
    movePieceAction,
  ]);

  return null;
};

export default DummyAI;
