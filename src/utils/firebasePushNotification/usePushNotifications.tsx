import { useEffect } from 'react';
import messaging from '@react-native-firebase/messaging';
import { PermissionsAndroid, Platform } from 'react-native';

import { useAppSelector } from '../../store/hooks';

import { getFcmToken, onMessageReceived } from './pushUtils';
import usePushOpenBook from './usePushOpenBook';


const usePushNotifications = () => {
  const isUser = useAppSelector(state => state.user.user);

  useEffect(() => {
    if (!isUser) {
      return
    }
    const requestUserPermission = async (): Promise<boolean> => {
      const isAndroidBelow32 = Platform.OS === 'android' && Platform.Version < 32
      if (Platform.OS === 'ios' || isAndroidBelow32) {
        const authStatus = await messaging().requestPermission();
        const isGranted =
          authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
          authStatus === messaging.AuthorizationStatus.PROVISIONAL;
        if (isGranted) {
          console.log('Authorization status:', authStatus);
        }
        return isGranted
      }
      else {
        const isAlreadyGranted = await PermissionsAndroid.check(
          PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
        )
        if (isAlreadyGranted) {
          return isAlreadyGranted
        }
        const permission = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
        )
        const isGranted = permission === PermissionsAndroid.RESULTS.GRANTED
        return isGranted
      }
    }

    const handleInitPushotifications = async () => {
      const isGranted = await requestUserPermission()
      if (isGranted) {
        getFcmToken();
      }
    }

    handleInitPushotifications()
    const unsubscribe = messaging().onMessage(onMessageReceived);
    messaging().setBackgroundMessageHandler(onMessageReceived);

    return () => {
      unsubscribe()
    };
  }, [isUser]);

  usePushOpenBook();
}

export default usePushNotifications;



