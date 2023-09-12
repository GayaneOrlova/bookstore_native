import { StyleSheet } from "react-native";

const AuthorizeBannerStyles = StyleSheet.create({
  authorize_container: {
    height: 501,
    backgroundColor: '#F0F4EF',
    marginHorizontal: 15,
    marginTop: 73,
    marginBottom: 73,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: 'center',
  },
  text_group: {
    flexDirection: 'column',
    alignSelf: 'flex-start',
    gap: 20,
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
    color: '#0D1821',
  },
  authorize_button: {
    width: 231,
    height: 44,
  },
  castle_image: {
    minWidth: 282,
    minHeight: 250,
    width: '100%',
    margin: 'auto',
    position: 'absolute',
    bottom: 0,
  },
  fairy_image: {
    position: 'absolute',
    alignSelf: 'flex-end',
  },
})

export default AuthorizeBannerStyles;
