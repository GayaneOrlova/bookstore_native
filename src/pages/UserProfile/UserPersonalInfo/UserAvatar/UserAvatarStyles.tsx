import { StyleSheet } from 'react-native';
import { COLORS } from '../../../../utils/colors';

const userAvatarStyles = StyleSheet.create({
  user_photo: {
    width: '100%',
    minWidth: 290,
    minHeight: 290,
    marginBottom: 50,
    borderRadius: 16,
    position: 'relative',
  },
  user_avatar_icon: {
    minWidth: 154,
    height: 154,
    width: '100%',
    alignSelf: 'center',
    marginVertical: 70,
  },
  camera_button: {
    width: 40,
    height: 40,
    maxWidth: '100%',
    borderRadius: 16,
    backgroundColor: COLORS.dark_blue,
    justifyContent: 'center',
    alignItems: 'center',
  },
  change_photo_button: {
    position: 'absolute',
    right: 10,
    bottom: 60,
  },
});

export default userAvatarStyles;
