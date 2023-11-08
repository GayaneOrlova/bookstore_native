import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useAppDispatch, useAppSelector } from './src/store/hooks';
import { getUser } from './src/api/user.api/user.api';
import { setUser } from './src/store/slices/userSlice';

import Homepage from './src/Homepage';
import Login from './src/Login/Login';
import UserProfile from './src/UserProfile/UserProfile';
import Cart from './src/Cart/Cart';
import Signup from './src/Signup/Signup';
import BookDetail from './src/BookDetail/BookDetail';
import FavoritesPage from './src/FavoritesPage/FavoritesPage';

import { toast } from './src/utils/utils';

const Stack = createStackNavigator();
import usePushNotifications from './src/utils/usePushNotifications';
import messaging from '@react-native-firebase/messaging';
import { Platform } from 'react-native';


const Main: React.FC = () => {

  if (Platform.OS === 'android') {
    messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Background Notification:', remoteMessage.notification)});
  };
  usePushNotifications();

  const [initialization, setInitialization] = useState(false);
  const isUser = useAppSelector(state => state.user.user);
  const cartList = useAppSelector(state => state.book.cartStore);
  const favoriteList = useAppSelector(state => state.book.favoriteBooks);
  const { results: paginationResults, count } = useAppSelector((state) => state.book.pagination)
  const dispatch = useAppDispatch();

  const getToken = async () => {
    try {
      const token = await AsyncStorage.getItem('access');
      if (!token) { return; }

      const response = await getUser();
      const user = response.data;
      dispatch(setUser(user));
    } catch (err: any) {
      const errorText = Object.values(err.response.data)[0];
      toast( errorText)
    } finally {
      setInitialization(true);
    }
  };

  useEffect(() => {
    getToken();
  }, [cartList, favoriteList, paginationResults]);

  if (!initialization) { return null; }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!isUser.email ? (
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
            <Stack.Screen
              name="BookDetail"
              component={BookDetail}
              options={{ title: 'BookDetail' }}
            />
          </>
        ) : (
          <>
           <Stack.Screen
              name="Homepage"
              component={Homepage}
              options={{ title: 'Homepage' }}
            />
            <Stack.Screen
              name="UserProfile"
              component={UserProfile}
              options={{ title: 'UserProfile' }}
            />
             <Stack.Screen
              name="BookDetail"
              component={BookDetail}
              options={{ title: 'BookDetail' }}
            />
            <Stack.Screen
              name="Cart"
              component={Cart}
              options={{ title: 'Cart' }}
            />
            <Stack.Screen
              name="FavoritesPage"
              component={FavoritesPage}
              options={{ title: 'FavoritesPage' }}
            />
          </>
        )
}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Main;
