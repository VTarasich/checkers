import React from 'react';
import { Provider } from 'react-redux';

import 'normalize.css';
import store from './store';
import MainContainer from './components/main-container/MainContainer';
import { GlobalStyle } from './common.styled';

const App: React.FC = () => (
  <>
    <GlobalStyle />
    <Provider store={store}>
      <MainContainer />
    </Provider>
  </>
);

export default App;
