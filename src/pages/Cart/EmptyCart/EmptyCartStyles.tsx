import { StyleSheet } from 'react-native';
import { COLORS } from '../../../utils/colors';

const emptyCartStyles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    gap: 30,
    marginTop: 30,
    marginBottom: 80,
    borderColor: '#D6D8E7',
    marginHorizontal: 15,
  },
  text: {
    fontSize: 18,
    fontWeight: '700',
    marginRight: 15,
    width: 165,
  },
  text_description: {
    color: COLORS.dark_blue,
  },
  cart_button: {
    minWidth: 290,
    height: 35,
    marginVertical: 10,
    backgroundColor: COLORS.dark_blue,
  },
  image: {
    width: 290,
    height: 176,
    alignSelf: 'center',
  },
});

export default emptyCartStyles;


