import { StyleSheet } from 'react-native';

const UserProfileStyles = StyleSheet.create({
  container: {
    marginHorizontal: 15,
    marginBottom: 80,
  },
  user_photo: {
    width: 290,
    height: 290,
    marginVertical: 50,
    borderRadius: 16,
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
});

export default UserProfileStyles;
