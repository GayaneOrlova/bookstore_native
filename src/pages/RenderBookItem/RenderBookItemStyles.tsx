import { StyleSheet } from 'react-native';
import { COLORS } from '../../utils/colors';


const renderBookItemStyles = StyleSheet.create({
  book_container: {
    gap: 10,
    marginTop: 10,
    flexDirection: 'column',
    marginHorizontal: 15,
    width: 165,
    flex: 1,
    maxWidth: 200,
    minWidth: 100,
  },
  book_image_container: {
    position: 'relative',
  },
  book_image: {
    width: 135,
    height: 192,
    borderRadius: 16,
  },
  favorite: {
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 1,
  },
  book_title: {
    color: COLORS.dark_blue,
  },
  book_author: {
    color: COLORS.dark_grey,
  },
  rating_container: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 10,
  },
  rating_text: {
    fontSize: 16,
    color: COLORS.dark_grey,
  },
  price_button: {
    minWidth: 135,
    height: 34,
    marginVertical: 10,
    alignItems: 'center',
    backgroundColor: COLORS.dark_blue,
  },
  button_on_cart: {
    minWidth: 135,
    height: 34,
    marginVertical: 10,
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderWidth: 1,
    opacity: 0.6,
  },
  available_button: {
    minWidth: 135,
    height: 34,
    marginVertical: 10,
    alignItems: 'center',
    backgroundColor: COLORS.dark_grey,
  },
  new_flag: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    zIndex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.green,
    minWidth: 113,
    height: 30,
  },
  bestseller_flag: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    zIndex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.dark_blue,
    minWidth: 113,
    height: 30,
  },
  favorite_button: {
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 1,
    width: 25,
    height: 25,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.dark_blue,
    opacity: 0.5,
  },
  favorite_button_liked: {
    opacity: 1
  },
});

export default renderBookItemStyles;
