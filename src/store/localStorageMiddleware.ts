import {
  AnyAction, Dispatch, MiddlewareAPI,
} from 'redux';
import {
  GameAction, HIT_PIECE, MOVE_PIECE, UNDO,
} from './game/actions';
import { saveGameToLocalStorage } from '../LocalStorageHandler';
import { selectGameState } from './game/selectors';
import { RootState } from './index';

const localStorageMiddleware = (
  { getState }: MiddlewareAPI<Dispatch, RootState>,
) => (next: Dispatch<AnyAction>) => (action: GameAction): AnyAction => {
  // Do something in here, when each action is dispatched
  const nextAction = next(action);
  const state = getState();

  if ([
    MOVE_PIECE,
    HIT_PIECE,
    UNDO,
  ].includes(action.type)) {
    saveGameToLocalStorage(selectGameState(state));
  }

  return nextAction;
};

export default localStorageMiddleware;
