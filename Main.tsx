import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';

import Homepage from './src/Homepage';
import Login from './src/Login/Login';
import UserProfile from './src/UserProfile/UserProfile';

const Stack = createStackNavigator();

function Main(): JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Homepage"
          component={Homepage}
          options={{title: 'Homepage'}}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{title: 'Login'}}
        />
        <Stack.Screen
          name="UserProfile"
          component={UserProfile}
          options={{title: 'UserProfile'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Main;
