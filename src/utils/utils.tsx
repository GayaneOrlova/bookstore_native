import Toast from 'react-native-simple-toast';
import { isAxiosError } from 'axios';

export const toast = (text: string | any) => {
  Toast.showWithGravityAndOffset( `${text}`,
      Toast.LONG,
      Toast.TOP,
      0,
      50,)
};

export const generateRandomID = (min = 1, max = 1000) => {
  let rand = min - 0.5 + Math.random() * (max - min + 1);
  return String(Math.round(rand));
}
export default generateRandomID



