import {StyleSheet} from 'react-native';

const CatalogStyles = StyleSheet.create({
  catalog_container: {
    flexDirection: 'column',
    gap: 20,
    marginHorizontal: 15,
    marginTop: 20,
    marginBottom: 80,
    // position: 'relative',

  },
  catalog_title: {
    fontSize: 18,
    fontWeight: '700',
  },
  dropdown: {
    backgroundColor: '#F0F4EF',
    position: "absolute",
    top: 60,
    width: "100%",
    zIndex: 1,
  },
  box: {
    minWidth: 290,
    width: '100%',
    borderRadius: 16,
    height: 48,
    alignItems: 'center',
    backgroundColor: '#F0F4EF',

  },
  content_container: {
    justifyContent: 'space-between',
    gap: 10,
    marginVertical: 20,

  },
  column_wrapper: {
    justifyContent: 'space-between',

  },
});

export default CatalogStyles;
