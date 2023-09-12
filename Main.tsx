import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import Homepage from './src/Homepage';
import Login from './src/Login/Login';
import UserProfile from './src/UserProfile/UserProfile';
import Cart from './src/Cart/Cart';
import Signup from './src/Signup/Signup';
import { useAppSelector } from './src/store/hooks';

const Stack = createStackNavigator();

function Main(): JSX.Element {
  const user = useAppSelector(state => state.user.user)

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!user.email ? (
          <>
            <Stack.Screen
              name="Homepage"
              component={Homepage}
              options={{ title: 'Homepage' }}
            />
            <Stack.Screen
              name="Login"
              component={Login}
              options={{ title: 'Login' }}
            />
            <Stack.Screen
              name="Signup"
              component={Signup}
              options={{ title: 'Signup' }}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="UserProfile"
              component={UserProfile}
              options={{ title: 'UserProfile' }}
            />
            <Stack.Screen
              name="Cart"
              component={Cart}
              options={{ title: 'Cart' }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Main;
