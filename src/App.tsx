import React from 'react';
import { Provider } from 'react-redux';

import BoardLayout from './components/board-layout/BoardLayout';
import store from './store';

const App: React.FC = () => (
  <Provider store={store}>
    <BoardLayout />
  </Provider>
);

export default App;
