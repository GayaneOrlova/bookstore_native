import { StyleSheet } from 'react-native';
import { COLORS } from '../../../utils/colors';

const sortByOptionsStyle = StyleSheet.create({
  box: {
    minWidth: 290,
    borderRadius: 16,
    alignItems: 'center',
    backgroundColor: COLORS.white,
    height: 48,
  },
  selectTitle: {
    fontSize: 14,
    color: COLORS.dark_blue,
  },
  dropdown: {
    backgroundColor: COLORS.white,
    marginBottom: 10,
    width: '100%',
  },
  catalog_container: {
    flexDirection: 'column',
    gap: 20,
    marginHorizontal: 15,
    marginTop: 20,
    marginBottom: 80,
  },
});

export default sortByOptionsStyle;
