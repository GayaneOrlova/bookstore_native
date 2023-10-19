import {StyleSheet} from 'react-native';

const bannerStyles = StyleSheet.create({
  container: {
    backgroundColor: '#F0F4EF',
    borderWidth: 1,
    borderColor: 'gray',
    marginTop: 39,
    marginLeft: 15,
    marginRight: 15,
    borderRadius: 16,
    height: 505,
  },

  text_group: {
    flexDirection: 'column',
    gap: 20,
    alignItems: 'flex-start',
    marginHorizontal: 20,
    marginTop: 20,
  },
  text_group_title: {
    fontWeight: '700',
    fontSize: 18,
    color: '#0D1821',
  },
  text_group_description: {
    fontWeight: '500',
    fontSize: 14,
    color: '#344966',
  },
  text_group_button: {
    width: 200,
    height: 38,
    backgroundColor: '#344966',
  },

  background_image: {
    width: 232,
    height: 140,
    position: 'absolute',
    marginTop: 15,
    alignSelf: 'flex-end',
    opacity: 0.2,
  },
  woman_image: {
    width: 253,
    height: 282,
    marginTop: 50,
    marginLeft: 15,
  },
});

export default bannerStyles;
