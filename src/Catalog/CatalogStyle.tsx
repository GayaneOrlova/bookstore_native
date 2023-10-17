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
  selectTitle: {
    fontSize: 14,
    color: '#344966',
  },
  dropdown: {
    backgroundColor: '#F0F4EF',
    marginBottom: 10,
    width: '100%',
    // position: "absolute",
    // maxTop: 120,
    // zIndex: 999,
  },
  badge: {
    backgroundColor: '#344966',
  },
  box: {
    minWidth: 290,
    borderRadius: 16,
    alignItems: 'center',
    backgroundColor: '#F0F4EF',
    height: 48,
  },
  checkBox: {
    borderRadius: 24,
    borderColor: '#344966',
    height: 24,
    width: 24,
  },
  dropdownText: {
    color: '#344966',
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
