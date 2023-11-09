import { StyleSheet } from 'react-native';
import { COLORS } from '../../../../utils/colors';

const genreFilterStyle = StyleSheet.create({
  box: {
    minWidth: 290,
    borderRadius: 16,
    alignItems: 'center',
    backgroundColor: COLORS.white,
    minHeight: 48,
  },
  selectTitle: {
    fontSize: 14,
    color: COLORS.dark_blue,
  },
  checkBox: {
    borderRadius: 24,
    borderColor: COLORS.dark_blue,
    height: 24,
    width: 24,
  },
  dropdown: {
    backgroundColor: COLORS.white,
    marginBottom: 10,
    width: '100%',
  },
  badge: {
    backgroundColor: COLORS.dark_blue,
    color: COLORS.white,
  },
});

export default genreFilterStyle;
