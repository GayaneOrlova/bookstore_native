import { StyleSheet } from 'react-native';

const CartStyles = StyleSheet.create({
  cart_page: {
    marginHorizontal: 15,
    marginTop: 30,
    marginBottom: 80,
  },
  cart_container: {
    flexDirection: 'column',
    gap: 30,
    marginHorizontal: 15,
    marginTop: 20,
    marginBottom: 80,
    borderColor: '#D6D8E7',
  },
  render_item: {
    flexDirection: 'row',
    gap: 20,
    borderBottomColor: '#D6D8E7',
    borderBottomWidth: 1,
    paddingBottom: 30,
  },
  render_item_last: {
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
    borderRadius: 16,
  },
  cart_item_detail: {
    gap: 20,
    justifyContent: 'space-between',
  },
  cart_text: {
    fontSize: 18,
    fontWeight: '700',
  },
  cart_texts: {
    gap: 10,
  },
  total_text: {
    fontSize: 24,
    marginBottom: 20,
    marginTop: 30,
  },
  item_price: {
    fontSize: 18,
    color: '#0D1821',
  },
  cart_text_description: {
    color: '#344966',
  },
  cart_button: {
    minWidth: 290,
    height: 35,
    marginVertical: 10,
    backgroundColor: '#344966',
  },
  continue_button: {
    color: 'black',
    minWidth: 290,
    height: 35,
    marginVertical: 10,
    borderWidth: 1,
    borderRadius: 16,
    borderColor: 'black',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center'
  },
  cart_image: {
    width: 290,
    height: 176,
    alignSelf: 'center',
  },
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modal_text: {
    backgroundColor: 'white',
    padding: 40
  },
});

export default CartStyles;


const COLORS = {
  primaryBorder: "#D6D8E7",
}