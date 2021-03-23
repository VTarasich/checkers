import { useSelector } from 'react-redux';

import { Coordinate } from '../../types';
import { getSelectIsPieceAvailableForTurn, selectCurrentPlayer, selectGameMode } from '../../store/game/selectors';
import { AI_PLAYER } from '../ai/DummyAI';

const useIsPieceInteractive = (coordinate: Coordinate): boolean => {
  const isAvailable = useSelector(getSelectIsPieceAvailableForTurn(coordinate));
  const gameMode = useSelector(selectGameMode);
  const currentPlayer = useSelector(selectCurrentPlayer);

  return gameMode === 'AI'
    ? currentPlayer !== AI_PLAYER && isAvailable
    : isAvailable;
};

export default useIsPieceInteractive;
