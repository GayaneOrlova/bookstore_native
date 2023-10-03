import {StyleSheet} from 'react-native';

const BookDetailStyle = StyleSheet.create({
  container: {
    marginVertical: 30,
    marginHorizontal: 15,
  },
  card_group: {
    flexDirection: 'row',
    gap: 10,
    // marginBottom: 10 
  },
  book_image: {
    width: 135,
    minHeight: 202,
    borderRadius: 16,
  },
  book_detail: {
    flexDirection: 'column',
    gap: 20, 
  },
  title_text: {
    color: '#0D1821',
    fontWeight: '700',
    fontSize: 18,
  },
  text_detail: {
    color: '#0D1821',
    fontSize: 14,
  },
  rate_image: {
    width: 15,
    minHeight: 15,
    marginTop: 10
  },
  text: {
    color: '#B9BAC3',
    fontSize: 14,
    marginTop: 10,
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
  rate_text: {
    color: '#BFCC94',
    fontWeight: '700',
    fontSize: 18,
  },
  description_text: {
    fontSize: 14,
    color: '#0D1821',
    marginVertical: 20,
  },
  book_body: {
    fontSize: 12,
    color: '#344966',
    marginBottom: 20,
  },
  price_button: {
    width: 210,
    height: 38,
    marginBottom:40,
    alignItems: 'center',
  },
  comment_input: {
    minHeight: 87,
    marginBottom: 30,
    paddingLeft: 10,
    backgroundColor: '#eaebea',
    borderRadius: 16,
  },
  comment_item: {
    width: '100%',
    marginBottom: 10,
    padding: 10,
    flexDirection: 'column',
    gap: 15,
    backgroundColor: '#eaebea',
    borderRadius: 16,
  },
  comment_author: {
    color: '#0D1821',
    fontWeight: '600',
    paddingBottom: 5,
  },
  comment_time: {
    color: '#B9BAC3',
    fontSize: 10,
  },
  avatar_image: {
    width: 35,
    height: 35,
    borderRadius: 25,
  },
  
});

export default BookDetailStyle;
