import { useEffect } from "react";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import messaging, { FirebaseMessagingTypes } from '@react-native-firebase/messaging';

import { RootStackParamList } from "../../pages/Catalog/Catalog";


type NavigationProps = StackNavigationProp<RootStackParamList>;

const usePushOpened = () => {
  const navigation = useNavigation<NavigationProps>();

  useEffect(() => {
    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage.data,
      );
      const id = remoteMessage.data?.bookId as string
      if (id) {
        navigation.navigate('BookDetail', { id: parseInt(id, 10) });
      }
    });

    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(remoteMessage.data, '!!!')

          const id = remoteMessage.data?.bookId as string
          if (id) {
            setTimeout(() => {
              navigation.navigate('BookDetail', { id: parseInt(id, 10) })
            }, 500)

          }
        }
      });
  }, [navigation]);
}

export default usePushOpened;

