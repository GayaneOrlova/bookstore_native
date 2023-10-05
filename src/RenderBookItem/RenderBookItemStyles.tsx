import {StyleSheet} from 'react-native';

const RenderBookItemStyles = StyleSheet.create({
  book_container: {
    gap: 10,
    marginTop: 10,
  },
  book_image_container: {
    position: 'relative',
  },
  book_image: {
    // maxWidth: 'auto',
    width: 135,
    // width: '100%',
    minHeight: 192,
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
  },
});

export default RenderBookItemStyles;
