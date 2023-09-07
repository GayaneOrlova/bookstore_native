import { StyleSheet } from 'react-native';

const UserButtonStyles = StyleSheet.create({
  button: {
    width: 33,
    height: 33,
    borderRadius: 16,
    backgroundColor: '#344966',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button_index: {
    width: 16,
    height: 15,
    top: -4,
    left: 23,
    borderRadius: 16,
    backgroundColor: '#BFCC94',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
  },
  button_index_count: {
    fontWeight: '700',
    fontSize: 10,
    color: '#344966',
  },
});

export default UserButtonStyles;
