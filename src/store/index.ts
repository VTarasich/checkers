import { createStore, combineReducers } from 'redux';

import { GameState, reducer } from './game/reducer';

export interface RootState {
  game: GameState,
}

const store = createStore(combineReducers<RootState>({
  game: reducer,
}));

export default store;
