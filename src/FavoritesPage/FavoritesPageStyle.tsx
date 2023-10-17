import {StyleSheet} from 'react-native';

const FavoritesPageStyles = StyleSheet.create({
  catalog_container: {
    marginHorizontal: 15,
    marginTop: 30,
    marginBottom: 80,
  },
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

export default FavoritesPageStyles;
