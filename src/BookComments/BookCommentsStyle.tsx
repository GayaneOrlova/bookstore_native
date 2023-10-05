import {StyleSheet} from 'react-native';

const BookCommentsStyle = StyleSheet.create({
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
    color: '#0D1821',
    fontWeight: '600',
    paddingBottom: 5,
  },
  comment_time: {
    color: '#B9BAC3',
    fontSize: 10,
  },
});

export default BookCommentsStyle;
