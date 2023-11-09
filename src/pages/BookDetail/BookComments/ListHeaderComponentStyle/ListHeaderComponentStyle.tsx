import {StyleSheet} from 'react-native';
import { COLORS } from '../../../../utils/colors';

const listHeaderComponentStyle = StyleSheet.create({
  container: {
    marginVertical: 30,
    marginHorizontal: 15,
  },
  book_info: {
    flexDirection: 'row',
    gap: 10,
  },
  book_image: {
    width: 135,
    minHeight: 202,
    borderRadius: 16,
  },
  book_detail: {
    gap: 20, 
  },
  title_text: {
    marginTop: 20,
    color: COLORS.dark,
    fontWeight: '700',
    fontSize: 17,
  },
  text_author: {
    color: COLORS.dark,
    fontSize: 14,
  },
  rate_image: {
    width: 15,
    minHeight: 15,
    marginTop: 10
  },
  text: {
    color: COLORS.dark_grey,
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
    backgroundColor: COLORS.white,
    padding: 40
  },
  rate_text: {
    color: COLORS.green,
    fontWeight: '700',
    fontSize: 18,
  },
  description_text: {
    fontSize: 14,
    color: COLORS.dark,
    marginVertical: 20,
  },
  book_body: {
    fontSize: 12,
    color: COLORS.dark_blue,
    marginBottom: 20,
  },
  price_button: {
    width: 210,
    height: 38,
    marginBottom: 60,
    alignItems: 'center',
    backgroundColor: COLORS.dark_blue,
  },
  available_button: {
    width: 210,
    height: 38,
    marginBottom: 60,
    alignItems: 'center',
    backgroundColor: COLORS.dark_grey,
  },
  comment_input: {
    minHeight: 87,
    marginBottom: 30,
    paddingLeft: 10,
    backgroundColor: '#eaebea',
    borderRadius: 16,
  },
});

export default listHeaderComponentStyle;
