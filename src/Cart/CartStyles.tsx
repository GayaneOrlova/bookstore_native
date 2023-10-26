import { StyleSheet } from 'react-native';
import { COLORS } from '../utils/colors';

const cartStyles = StyleSheet.create({
  cart_container: {
    flexDirection: 'column',
    gap: 30,
    marginTop: 30,
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
  },
  cart_item_image: {
    width: 135,
    height: 202,
    borderRadius: 16,
    marginHorizontal: 15,
  },
  cart_item_detail: {
    gap: 20,
    justifyContent: 'space-between',
    marginRight: 15,
  },
  cart_text: {
    fontSize: 18,
    fontWeight: '700',
    marginRight: 15,
    width: 165,
  },
  cart_texts: {
    gap: 10,
  },
  total_text: {
    fontSize: 24,
    marginBottom: 20,
    marginTop: 30,
    marginHorizontal: 15,
  },
  item_price: {
    fontSize: 18,
    color: COLORS.dark,
  },
  cart_button: {
    minWidth: 290,
    height: 35,
    marginVertical: 10,
    marginHorizontal: 15,
    backgroundColor: COLORS.dark_blue,
  },
  continue_button: {
    color: COLORS.dark,
    minWidth: 290,
    height: 35,
    marginVertical: 10,
    borderWidth: 1,
    borderRadius: 16,
    borderColor: COLORS.dark,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 15,
  },
});

export default cartStyles;


