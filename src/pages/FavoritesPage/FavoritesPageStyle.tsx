import {StyleSheet} from 'react-native';

const favoritesPageStyles = StyleSheet.create({
  content_container: {
    gap: 20,
  },
  column_wrapper: {
    justifyContent: 'space-between',
  },
  noFavoriteText: {
    marginHorizontal: 15,
    marginVertical: 30,
    fontStyle: 'italic',
    fontSize: 16,
  },
});

export default favoritesPageStyles;
