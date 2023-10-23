import Toast from 'react-native-simple-toast';
import { isAxiosError } from 'axios';

export const toast = (text: string | any) => {
  Toast.showWithGravityAndOffset( `${text}`,
      Toast.LONG,
      Toast.TOP,
      0,
      50,)
};

// export const axiosError = (err: any) => {
//   if (isAxiosError(err)) {
//     const errorText = Object.values(err.response?.data)[0];
//     toast(errorText);
//   }
//   else {
//     toast('An error was occured!');
//   }
//   }
  
// };

