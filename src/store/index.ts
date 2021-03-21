import {
  createStore, combineReducers, applyMiddleware, compose, Middleware,
} from 'redux';

import { GameState, reducer } from './game/reducer';
import localStorageMiddleware from './localStorageMiddleware';

export interface RootState {
  game: GameState,
}

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(combineReducers<RootState>({
  game: reducer,
}), composeEnhancers(
  applyMiddleware(localStorageMiddleware as Middleware),
));

export default store;
