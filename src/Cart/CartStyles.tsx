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
  render_item: {
    flexDirection: 'row',
    gap: 20,
  },
  cart_item: {
    flexDirection: 'column',
    gap: 30,
    marginVertical: 30,
  },
  cart_item_image: {
    width: 135,
    height: 202,
  },
  cart_item_detail: {
    gap: 20,
  },
  cart_item_name: {
    fontWeight: '700',
  },
  amount_container: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  
  amount_buttons: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#dcdedc',
    width: 32, height: 32,
    borderRadius: 25,
  },
  amount_buttons_text: {
    fontSize: 16,
    fontWeight: '600',
  },
  amount_button_number: {
    width: 20,
    textAlign: 'center',
  },
  delete_container: {
    marginLeft: 10,
  },
  delete_icon: {
    width: 20,
    height: 20,
    marginLeft: 10,
  },
  total_text: {
    fontSize: 24,
    marginBottom: 20,
    marginTop: 50,
  },
  
  cart_text: {
    fontSize: 18,
    fontWeight: '700',
  },
  cart_text_description: {
    color: '#344966',
  },
  cart_button: {
    minWidth: 290,
    height: 35,
    marginVertical: 10,
  },  
  continue_button: {
    color: 'black',
    minWidth: 290,
    height: 35,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: '#dcdedc',
  },
  cart_image: {
    width: 290,
    height: 176,
    alignSelf: 'center',
  },
  
});

export default CartStyles;
