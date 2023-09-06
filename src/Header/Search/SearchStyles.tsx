import {StyleSheet} from 'react-native';

const SearchStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 68,
  },
  input: {
    flexDirection: 'row',
    alignItems: 'center',
    //border убрать после коррекции цвета фона
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 16,
    backgroundColor: '#F0F4EF',
    marginLeft: 15,
    marginRight: 15,
  },
  search_icon: {
    width: 24,
    height: 24,
    marginHorizontal: 24,
  },
  text_input: {
    flex: 1,
    height: 47,
  },
});

export default SearchStyles;
