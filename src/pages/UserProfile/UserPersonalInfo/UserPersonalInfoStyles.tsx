import { StyleSheet } from 'react-native';
import { COLORS } from '../../../utils/colors';

const userPersonalInfoStyles = StyleSheet.create({
  title: {
    fontSize: 16,
    color: COLORS.dark,
    marginBottom: 10,
  },
  change_text: {
    fontSize: 12,
    color: '#8D9F4F',
    marginBottom: 10,
    textDecorationLine: 'underline'
  },
  input: {
    width: 290,
    height: 56,
  },
  input_description: {
    fontSize: 12,
    left: 60,
    top: -48,
  },
  button_confirm: {
    width: 170,
    height: 44,
    marginTop: 30,
    backgroundColor: COLORS.dark_blue,

  },
  buttons_container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: 110,
  },
  error: {
    color: 'red',
    fontWeight: '700',
    fontSize: 12,
    left: 60,
    top: -15,
  },
});

export default userPersonalInfoStyles;
