import { StyleSheet } from 'react-native';

const genreFilterStyle = StyleSheet.create({
  box: {
    minWidth: 290,
    borderRadius: 16,
    alignItems: 'center',
    backgroundColor: '#F0F4EF',
    minHeight: 48,
  },
  selectTitle: {
    fontSize: 14,
    color: '#344966',
  },
  checkBox: {
    borderRadius: 24,
    borderColor: '#344966',
    height: 24,
    width: 24,
  },
  dropdown: {
    backgroundColor: '#F0F4EF',
    marginBottom: 10,
    width: '100%',
  },
  badge: {
    backgroundColor: '#344966',
    color: 'white',
  },
});

export default genreFilterStyle;
