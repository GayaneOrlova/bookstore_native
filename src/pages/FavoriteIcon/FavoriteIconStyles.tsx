import {StyleSheet} from 'react-native';
import { COLORS } from '../../utils/colors';

const favoriteIconStyles = StyleSheet.create({
  favorite_button: {
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 1,
    width: 25,
    height: 25,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.dark_blue,
    opacity: 0.5,
  },
  favorite_button_liked: {
    opacity: 1
  },
});

export default favoriteIconStyles;
