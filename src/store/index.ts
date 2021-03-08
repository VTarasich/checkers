import { createStore, combineReducers } from 'redux';

import { game } from './game';

const store = createStore(combineReducers({
  game,
}));

export default store;
