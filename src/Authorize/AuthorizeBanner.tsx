import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Image, Text, View } from "react-native";
import Button from "../Button/Button";
import AuthorizeBannerStyles from "./AuthorizeBannerStyles";


const AuthorizeBanner = () => {
  const navigation = useNavigation();

  return (
    <View style={AuthorizeBannerStyles.authorize_container}>
    <Image
      style={AuthorizeBannerStyles.fairy_image}
      source={require('/Users/gayaneorlova/bookstore_native/images/fairy.png')}
    />
    <View style={AuthorizeBannerStyles.text_group}>
      <Text style={AuthorizeBannerStyles.text_group_title}>Authorize now</Text>
      <Text style={AuthorizeBannerStyles.text_group_description}>
        Authorize now and discover the fabulous world of books
      </Text>
      <Button
        text="Log In/ Sing Up"
        style={AuthorizeBannerStyles.authorize_button}
        onPress={() => navigation.navigate('Login')}
      />
    </View>
    <Image
      style={AuthorizeBannerStyles.castle_image}
      source={require('/Users/gayaneorlova/bookstore_native/images/castle.png')}
    />
  </View>
);
}

export default AuthorizeBanner