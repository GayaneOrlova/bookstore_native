import { StyleSheet } from 'react-native';
import { COLORS } from '../../utils/colors';

const userButtonStyles = StyleSheet.create({
  button: {
    width: 33,
    height: 33,
    borderRadius: 16,
    backgroundColor: COLORS.dark_blue,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cart_index: {
    width: 16,
    height: 15,
    top: -4,
    left: 23,
    borderRadius: 16,
    backgroundColor: COLORS.green,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
  },
  favorite_index: {
    width: 16,
    height: 15,
    top: -4,
    left: 76,
    borderRadius: 16,
    backgroundColor: COLORS.green,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
  },
  button_index_count: {
    fontWeight: '700',
    fontSize: 10,
    color: COLORS.dark_blue,
  },
});

export default userButtonStyles;
