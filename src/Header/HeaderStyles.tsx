import {StyleSheet} from 'react-native';

const HeaderStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    top: 33,
    marginLeft: 15,
    marginRight: 15,
  },
  logo: {
    width: 62,
    height: 31,
  },
  text: {
    fontSize: 14,
  },
  button: {
    width: 135,
    height: 38,
    fontSize: 12,
  },
});

export default HeaderStyles;
