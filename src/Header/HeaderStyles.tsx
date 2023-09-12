import {StyleSheet} from 'react-native';

const HeaderStyles = StyleSheet.create({
  header_container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    top: 33,
    marginLeft: 15,
    marginRight: 15,
  },
  header_logo: {
    width: 62,
    height: 31,
  },
  header_text: {
    fontSize: 14,
  },
  header_button_container: {
   flexDirection: 'row',
   justifyContent: 'space-between',
   gap: 10,
  },
  header_button: {
    width: 100,
    height: 38,
    fontSize: 12,
  },
  header_user_button: {
    flexDirection: 'row',
    gap: 20,
  },
});

export default HeaderStyles;
