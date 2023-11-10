import { StyleSheet } from 'react-native';

const catalogStyles = StyleSheet.create({
  catalog_container: {
    flexDirection: 'column',
    gap: 20,
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
  },
  content_container: {
    gap: 10,
  },
  column_wrapper: {
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
