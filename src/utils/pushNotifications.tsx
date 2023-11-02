import React, { useEffect } from 'react';
import messaging from '@react-native-firebase/messaging';
import { Alert, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import Button from '../Button/Button';
import PushNotification from 'react-native-push-notification';


type Props = {};

const PushNotifications: React.FC<Props> = () => {

  // const createNotificationChannel = () => {
  //   PushNotification.createChannel(
  //     {
  //       channelId: 'my-channel-id',
  //       channelName: 'My Channel', 
  //       channelDescription: 'A channel to display notifications',
  //       playSound: false,
  //       soundName: "default",
  //       importance: 4, 
  //       vibrate: true,
  //     },
  //     (created) => console.log(`Notification channel created: ${created}`)
  //   );
  // };
  
  // createNotificationChannel();
const getToken = async () => {
    const token = await messaging().getToken();
    console.log('token', token);
  };

  const getPushData = (message) => {
    const channelId = '685510684897';
    PushNotification.localNotification({
      channelId: channelId,
      message: message.notification.body,
      title: message.notification.title,
    });
    console.log('message', message);
  };
  //   PushNotification.localNotification({
  //     message: message.notification.body,
  //     title: message.notification.title,
  //     channelId: message.notification.from
  //   });
  //   console.log('message', message);
  // };

  messaging().onMessage(getPushData);


  useEffect(() => {
    getToken();
  }, []);

  return (
    <View>
    </View>
  )
};

export default PushNotifications;