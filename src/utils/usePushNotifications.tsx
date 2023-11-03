import { useEffect } from 'react';
import messaging from '@react-native-firebase/messaging';
import { Alert } from 'react-native';


const usePushNotifications = () => {
  useEffect(() => {
    async function requestUserPermission() {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        console.log('Authorization status:', authStatus);
      }
    }

    async function getFcmToken() {
      const fcmToken = await messaging().getToken();
      console.log('FCM Token:', fcmToken);
      return fcmToken;
    };

    requestUserPermission();
    getFcmToken();
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      console.log('remoteMessage', remoteMessage)
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    return () => unsubscribe();
  }, []);

};

export default usePushNotifications;
