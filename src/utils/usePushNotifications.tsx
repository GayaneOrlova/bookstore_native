import { useEffect } from 'react';
import messaging, { FirebaseMessagingTypes } from '@react-native-firebase/messaging';
import notifee from '@notifee/react-native';

import { postToApi } from '../api/user.api/user.api';

import { toast } from './utils';


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
    };

    // далее создаем токен:
    async function getFcmToken() {
      await messaging().registerDeviceForRemoteMessages();
      const fcmToken = await messaging().getToken();

      try {
        const responce = await postToApi({ android: 'android', fcmToken });
      }
      catch (err: any) {
        const errorText = Object.values(err.response.data)[0];
        toast(errorText)
      }
      return fcmToken;
    };

    requestUserPermission();
    getFcmToken();

    //подписка на сообщения (для вывода данных):
    async function onMessageReceived(remoteMessage: any) {
      console.log('111', remoteMessage)
      const { type, timestamp, bookId } = remoteMessage.data;

      console.log('remoteMessage.data', remoteMessage.data);

      if (type === 'comment_notification') {
        notifee.displayNotification({
          title: 'New comment on the book',
          body: 'Someone left a comment on the book',
          android: {
            channelId: 'comments',
          },
        });
      }

      // Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
      // console.log(`Hello ${remoteMessage.data.hello}`); // Hello world!
    }

    const unsubscribe = messaging().onMessage(onMessageReceived);
    messaging().setBackgroundMessageHandler(onMessageReceived);

    return () => unsubscribe();
  }, []);
}

export default usePushNotifications;
