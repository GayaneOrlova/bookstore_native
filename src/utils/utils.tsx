import Toast from 'react-native-simple-toast';

export const toastic = (text: string | any) => {
  Toast.showWithGravityAndOffset( `${text}`,
      Toast.LONG,
      Toast.TOP,
      0,
      50,)
};


