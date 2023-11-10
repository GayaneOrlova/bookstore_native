import {StyleSheet} from 'react-native';
import { COLORS } from '../../utils/colors';

const buttonStyles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
  },
  text_button: {
    color: COLORS.white,
    fontWeight: '500',
  },
  button_on_cart: {
    color: COLORS.dark,
  }
});

export default buttonStyles;
