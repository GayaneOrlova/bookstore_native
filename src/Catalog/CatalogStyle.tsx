import {StyleSheet} from 'react-native';

const CatalogStyles = StyleSheet.create({
  catalog_container: {
    flexDirection: 'column',
    gap: 20,
    marginHorizontal: 15,
    marginTop: 20,
    marginBottom: 80,
  },
  catalog_title: {
    fontSize: 18,
    fontWeight: '700',
  },
  container: {
    backgroundColor: '#F0F4EF',
  },
  selector: {
    minWidth: 290,
    width: '100%',
    borderRadius: 16,
    height: 48,
    alignItems: 'center',
    backgroundColor: '#F0F4EF',
  },
  book_item: {
    minHeight: 333,
    // alignItems: 'left',
    gap: 10,
    marginTop: 10,
  },
  image_container: {
    position: 'relative',
  },
  icon_container: {
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 1,
  },
  favorite_button: {
    width: 25,
    height: 25,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#344966',
    opacity: 0.2,
  },
  favorite_button_liked: {
    opacity: 1
  },
  favorite_icon: {
    borderColor: 'white',
    borderWidth: 1,
  },
  text_title: {
    color: '#344966',
  },
  text_author: {
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
    width: 135,
    height: 34,
    marginVertical: 10,
    alignItems: 'center',
  },
  content_container: {
    justifyContent: 'space-between',
    gap: 10,
  },
  column_wrapper: {
    justifyContent: 'space-between',
  },
});

export default CatalogStyles;
