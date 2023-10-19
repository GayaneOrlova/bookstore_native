import { StyleSheet } from 'react-native';

const inputProfileStyles = StyleSheet.create({
  user_photo: {
    width: '100%',
    minWidth: 290,
    minHeight: 290,
    marginVertical: 50,
    borderRadius: 16,
    position: 'relative',

  },
  user_avatar_container: {
    backgroundColor: '#F0F4EF',
    borderWidth: 1,
    borderRadius: 16,
    marginVertical: 50,
    minWidth: 290,
    minHeight: 290,
    width: '100%',
    position: 'relative',
  },
  user_avatar_icon: {
    minWidth: 154,
    height: 154,
    width: '100%',
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
  button_confirm: {
    width: 170,
    height: 44,
    marginTop: 30,
    backgroundColor: '#344966',

  },
  buttons_container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: 110,
  },
  camera_button: {
    width: 40,
    height: 40,
    maxWidth: '100%',
    borderRadius: 16,
    backgroundColor: '#344966',
    justifyContent: 'center',
    alignItems: 'center',
    },
  change_photo_button: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    position: 'absolute',
    right: 10,
    bottom: 60,
  },
  error: {
    color: 'red',
    fontWeight: '700',
  },
  modal_container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modal_text: {
    backgroundColor: 'white',
    padding: 20,
  }
  
});

export default inputProfileStyles;
