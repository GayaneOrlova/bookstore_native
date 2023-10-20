import { StyleSheet } from 'react-native';
import { COLORS } from '../utils/colors';

const cartStyles = StyleSheet.create({
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
    color: COLORS.dark,
  },
  cart_text_description: {
    color: COLORS.dark_blue,
  },
  cart_button: {
    minWidth: 290,
    height: 35,
    marginVertical: 10,
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
    backgroundColor: COLORS.white,
    padding: 40
  },
});

export default cartStyles;


