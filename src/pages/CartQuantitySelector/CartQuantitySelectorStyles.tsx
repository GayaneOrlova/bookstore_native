import { StyleSheet } from 'react-native';
import { COLORS } from '../../utils/colors';

const cartQuantitySelectorStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  buttons: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.light_grey,
    width: 32,
    height: 32,
    borderRadius: 25,
  },
  buttons_text: {
    fontSize: 16,
    fontWeight: '600',
  },
buttons_number: {
    width: 20,
    textAlign: 'center',
  },
  delete_button: {
    marginLeft: 10,
  },
  delete_icon: {
    width: 20,
    height: 20,
    marginLeft: 10,
  },
});

export default cartQuantitySelectorStyles;
