import { StyleSheet } from 'react-native';

const InputProfileStyles = StyleSheet.create({
  user_photo: {
    width: '100%',
    minWidth: 290,
    minHeight: 290,
    marginVertical: 50,
    borderRadius: 16,
  },
  user_avatar_container: {
    backgroundColor: '#F0F4EF',
    borderWidth: 1,
    borderRadius: 16,
    marginVertical: 50,
    minWidth: 290,
    minHeight: 290,
    width: '100%',
  },
  user_avatar_icon: {
    width: 154,
    height: 154,
    // width: '100%',
    alignSelf: 'center',
    marginVertical: 70,
  },
  title: {
    fontSize: 16,
    color: '#0D1821',
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

export default InputProfileStyles;