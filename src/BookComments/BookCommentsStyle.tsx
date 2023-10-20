import {StyleSheet} from 'react-native';
import { COLORS } from '../utils/colors';

const bookCommentsStyle = StyleSheet.create({
  comments_container: {
  marginBottom: 10,
  },
  comment_item: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#eaebea',
    borderRadius: 16,
  },
  detail_info_group: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 10,
  },
  avatar_image: {
    width: 35,
    height: 35,
    borderRadius: 25,
  },  
  comment_author: {
    color: COLORS.dark,
    fontWeight: '600',
    paddingBottom: 5,
  },
  comment_time: {
    color: COLORS.dark_grey,
    fontSize: 10,
  },
});

export default bookCommentsStyle;
