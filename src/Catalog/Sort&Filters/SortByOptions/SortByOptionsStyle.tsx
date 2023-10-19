import { StyleSheet } from 'react-native';

const sortByOptionsStyle = StyleSheet.create({
  box: {
    minWidth: 290,
    borderRadius: 16,
    alignItems: 'center',
    backgroundColor: '#F0F4EF',
    height: 48,
  },
  selectTitle: {
    fontSize: 14,
    color: '#344966',
  },
  dropdown: {
    backgroundColor: '#F0F4EF',
    marginBottom: 10,
    width: '100%',
  },
  catalog_container: {
    flexDirection: 'column',
    gap: 20,
    marginHorizontal: 15,
    marginTop: 20,
    marginBottom: 80,
  },
});

export default sortByOptionsStyle;
