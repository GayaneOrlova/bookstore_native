import {StyleSheet} from 'react-native';

const renderBookItemStyles = StyleSheet.create({
  book_container: {
    gap: 10,
    marginTop: 10,
    flexDirection: 'column',
  },
  book_image_container: {
    position: 'relative',
  },
  book_image: {
    width: 135,
    // width: "100%",
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
    color: '#344966',
  },
  book_author: {
    color: '#B9BAC3',
  },
  rating_container: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 10,
  },
  rating_text: {
    fontSize: 16,
    color: '#B9BAC3',
  },
  price_button: {
    minWidth: 135,
    height: 34,
    marginVertical: 10,
    alignItems: 'center',
    backgroundColor: '#344966',
  },
 button_on_cart: {
    minWidth: 135,
    height: 34,
    marginVertical: 10,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  
  available_button: {
    minWidth: 135,
    height: 34,
    marginVertical: 10,
    alignItems: 'center',
    backgroundColor: '#B9BAC3',
  },
  new_flag: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    zIndex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#BFCC94',
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
    backgroundColor: '#344966',
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
    backgroundColor: '#344966',
    opacity: 0.5,
  },
  favorite_button_liked: {
    opacity: 1
  },
});

export default renderBookItemStyles;
