import { StyleSheet } from 'react-native';

const CartStyles = StyleSheet.create({
  cart_container: {
    flexDirection: 'column',
    gap: 30,
    marginHorizontal: 15,
    marginTop: 40,
    marginBottom: 80,
    borderColor: '#D6D8E7',
  },
  cart_text: {
  fontSize: 18,
  fontWeight: '700',
  },
  cart_text_description: {
  color: '#344966',
  },
  cart_button: {
  width: 290,
  height: 35,
  },
  cart_image: {
    width: 290,
    height: 176,
    alignSelf: 'center',
  },
});

export default CartStyles;
