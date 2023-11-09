import React from 'react';
import { Provider } from 'react-redux';
import store from './src/store/store';
import Main from './src/pages/Main';
import { NavigationContainer } from '@react-navigation/native';

function App(): JSX.Element {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <Main />
      </Provider>
    </NavigationContainer>

  );
}

export default App;
