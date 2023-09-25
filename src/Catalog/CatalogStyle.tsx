import {StyleSheet} from 'react-native';

const HeaderStyles = StyleSheet.create({
  catalog_container: {
    flexDirection: 'column',
    gap: 20,
    marginHorizontal: 15,
    marginTop: 20,
    marginBottom: 80,
  },
  catalog_title: {
    fontSize: 18,
    fontWeight: '700',
  },
  container: {
    backgroundColor: '#F0F4EF',
  },
  selector: {
    minWidth: 290,
    width: '100%',
    borderRadius: 16,
    height: 48,
    alignItems: 'center',
    backgroundColor: '#F0F4EF',
  },
  
});

export default HeaderStyles;
