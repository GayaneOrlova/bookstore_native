import {StyleSheet} from 'react-native';

const paginationStyle = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 30,
    marginTop: 20,
  },
  button: {
    fontWeight: 'bold',
  },
});

export default paginationStyle;
