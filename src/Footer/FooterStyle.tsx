import {StyleSheet} from 'react-native';
import { COLORS } from '../utils/colors';

const footerStyle = StyleSheet.create({
  footer: {
   backgroundColor: COLORS.dark,
   height: 650,
  },
  footer_container: {
    marginHorizontal: 15,
    flexDirection: 'column',
    gap: 40,
  },
  footer_logo: {
    width: 88,
    height: 46,
    marginTop: 73,
  },
  footer_text: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.white,
  },
  footer_contacts: {
    flexDirection: 'column',
    gap: 10,
  },
  footer_navigation: {
    flexDirection: 'column',
    gap: 20,
  },
  footer_image: {
    height: 160,
    width: '100%',
  },
  footer_button: {
    backgroundColor: 'none',
  },
});

export default footerStyle;
