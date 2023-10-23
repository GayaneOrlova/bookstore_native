import { StyleSheet } from 'react-native';

const catalogStyles = StyleSheet.create({
  catalog_container: {
    flexDirection: 'column',
    gap: 20,
    // marginHorizontal: 15,
    marginTop: 20,
    marginBottom: 20,
  },
  catalog_header: {
    marginHorizontal: 15,
    marginVertical: 30,
  },
  catalog_title: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 20,
  },
  catalogList: {
    zIndex: -1,
    position: 'relative',
  },
  content_container: {
    // justifyContent: 'space-between',
    gap: 10,
    marginVertical: 20,
  },
  column_wrapper: {
    // justifyContent: 'space-between',
  },
  no_books_text: {
    fontSize: 16,
    fontWeight: '600',
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 20,
  },
  list_footer: {
  }
});

export default catalogStyles;
