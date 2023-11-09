import { StyleSheet } from 'react-native';
import { COLORS } from '../../../utils/colors';

const userPasswordControllerStyles = StyleSheet.create({
  change_text: {
    fontSize: 12,
    color: '#8D9F4F',
    marginBottom: 10,
    textDecorationLine: 'underline',
  },
  input: {
    width: 290,
    height: 56,
    flex: 1,
  },
  input_description: {
    fontSize: 12,
    left: 60,
    top: -50,
  },
  password_group: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 15,
  },
  button_confirm: {
    width: 170,
    height: 44,
    marginTop: 30,
    backgroundColor: COLORS.dark_blue,
  },
  
  
  error: {
    color: 'red'
  },
  
});

export default userPasswordControllerStyles;
