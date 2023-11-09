/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

if (Platform.OS === 'android') {
  messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Background Notification:', remoteMessage.notification);
  });

  usePushNotifications();
}

AppRegistry.registerComponent(appName, () => App);
