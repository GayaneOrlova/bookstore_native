import messaging, { FirebaseMessagingTypes } from '@react-native-firebase/messaging';
import { postToApi } from '../../api/user.api/user.api';
import { toast } from '../utils';

export async function getFcmToken() {
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


export async function onMessageReceived(remoteMessage: any) {
  const { type} = remoteMessage.data;
 
  if (type === 'comment_notification') {
    toast(`User ${remoteMessage.notification.title}`)
  }
}