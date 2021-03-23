import { GameState } from '../store/game/reducer';

const getHistoryEntry = (currentState: GameState): Partial<GameState> => {
  const {
    cells,
    currentPlayer,
    availableTurnPieces,
    mandatoryTurnPiece,
  } = currentState;

  return {
    cells,
    currentPlayer,
    availableTurnPieces,
    mandatoryTurnPiece,
  };
};

export default getHistoryEntry;
