import {StyleSheet} from 'react-native';
import { COLORS } from '../../utils/colors';

const headerStyles = StyleSheet.create({
  header_container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 15,
    top: 30,
    marginBottom: 70,
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
    backgroundColor: COLORS.dark_blue,
  },
  header_user_button: {
    flexDirection: 'row',
    gap: 20,
  },
});

export default headerStyles;
