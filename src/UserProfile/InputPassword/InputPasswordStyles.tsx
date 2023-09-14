import { StyleSheet } from 'react-native';

const InputPasswordStyles = StyleSheet.create({
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
  },
});

export default InputPasswordStyles;
