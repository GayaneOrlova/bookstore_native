import { StyleSheet } from 'react-native';

const CatalogStyles = StyleSheet.create({
  catalog_container: {
    flexDirection: 'column',
    gap: 20,
    marginHorizontal: 15,
    marginTop: 20,
    marginBottom: 80,
  },
  catalog_title: {
    fontSize: 18,
    fontWeight: '700',
  },
  
  catalogList: {
    zIndex: -1,
    position: 'relative',
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
