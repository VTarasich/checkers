import {
  createStore, combineReducers, applyMiddleware,
} from 'redux';

import { GameState, reducer } from './game/reducer';
import localStorageMiddleware from './localStorageMiddleware';

export interface RootState {
  game: GameState,
}

const store = createStore(combineReducers<RootState>({
  game: reducer,
}), applyMiddleware(localStorageMiddleware));

export default store;
