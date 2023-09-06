import React from 'react';
import {Provider} from 'react-redux';
import store from './src/store/store';
import Main from './/Main';

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
}

export default App;
