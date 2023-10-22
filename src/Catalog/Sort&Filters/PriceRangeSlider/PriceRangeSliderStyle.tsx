import { StyleSheet } from 'react-native';
import { COLORS } from '../../../utils/colors';

const priceRangeSliderStyles = StyleSheet.create({
  box: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 16,
    borderColor: 'grey',
    borderWidth: 1,
    height: 48,
    flexDirection: 'row',
    marginBottom: 10,    
  },
  text: {
    fontSize: 14,
    color: COLORS.dark_blue,
    marginLeft: 22,
  },
  dropdown_button: {
    width: '100%',
    position: 'absolute',
    right: 22,
    alignItems: 'flex-end',
  },
  dropdown_button_image: {
    width: 14,
    height: 14,
    opacity: 0.35
  },
  dropdown: {
    width: '100%',
    backgroundColor: COLORS.white,
    borderRadius: 16,
    borderColor: 'grey',
    borderWidth: 1,
    height: 140,
    marginBottom: 10,
  },
  slider_container: {
    marginVertical: 20,
    alignItems: 'center',
    paddingTop: 25,
    marginBottom: 20,
  },
  track: {
    height: 12,
    backgroundColor: '#D6D8E7',
    borderRadius: 16,
  },
  selectedTrack: {
    backgroundColor: COLORS.green,
  },
  markers: {
    height: 32,
    width: 32,
    marginBottom: -12,
    borderRadius: 16,
    backgroundColor: COLORS.white,
    borderColor: COLORS.green,
    borderWidth: 2,
  },
  rangeValues: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 50,
    marginVertical: -10,
  },
});

export default priceRangeSliderStyles;
