import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Homepage from './src/Homepage';
import Login from './src/Login/Login';
import UserProfile from './src/UserProfile/UserProfile';
import Cart from './src/Cart/Cart';
import Signup from './src/Signup/Signup';
import { useAppDispatch, useAppSelector } from './src/store/hooks';
import { getUser } from './src/api/user.api/user.api';
import { setUser } from './src/store/slices/userSlice';

const Stack = createStackNavigator();

function Main(): JSX.Element {  
  const [initialization, setInitialization] = useState(false);
  const isUser = useAppSelector(state => state.user.user);
  const dispatch = useAppDispatch();

  const getToken = async () => {
    try {
      const token = await AsyncStorage.getItem('access');
      if (!token) { return; }

      const response = await getUser();
      const user = response.data;
      dispatch(setUser(user));
    } catch (er) {
      console.log(er);
    } finally {
      setInitialization(true);
    }
  };

  useEffect(() => {
    getToken();
  }, []);

  if (!initialization) { return null; }


  return (
    <NavigationContainer>
      <Stack.Navigator>
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
        {isUser.email ? (
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
        )
          : null
        }
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Main;
