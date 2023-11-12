import {StyleSheet} from 'react-native';
import { COLORS } from '../../../utils/colors';

const bookCommentsStyle = StyleSheet.create({
  price_button: {
    width: 210,
    height: 38,
    marginBottom: 60,
    alignItems: 'center',
    backgroundColor: COLORS.dark_blue,
  },
  comment_input: {
    minHeight: 87,
    marginBottom: 30,
    paddingLeft: 10,
    backgroundColor: COLORS.light_grey,
    borderRadius: 16,
  },
  post_comment: {
  marginHorizontal: 15,
  },
});

export default bookCommentsStyle;
