import Toast from 'react-native-simple-toast';

export const toast = (text: string | any) => {
  Toast.showWithGravityAndOffset( `${text}`,
      Toast.LONG,
      Toast.TOP,
      0,
      50,)
};

export const axiosError = (isAxiosError: any) => {
 
  
};

