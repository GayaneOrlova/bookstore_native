import React from "react";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Image, Text, View } from "react-native";

import Button from "../Button/Button";
import authorizeBannerStyles from "./AuthorizeBannerStyles";

type RootStackParamList = {
  Login: undefined;
};
type NavigationProps = StackNavigationProp<RootStackParamList>;

const AuthorizeBanner = () => {
  const navigation = useNavigation<NavigationProps>();

  return (
    <View style={authorizeBannerStyles.authorize_container}>
    <Image
      style={authorizeBannerStyles.fairy_image}
      source={require('../../images/fairy.png')}
    />
    <View style={authorizeBannerStyles.text_group}>
      <Text style={authorizeBannerStyles.text_group_title}>Authorize now</Text>
      <Text style={authorizeBannerStyles.text_group_description}>
        Authorize now and discover the fabulous world of books
      </Text>
      <Button
        text="Log In/ Sing Up"
        style={authorizeBannerStyles.authorize_button}
        onPress={() => navigation.navigate('Login')}
      />
    </View>
    <Image
      style={authorizeBannerStyles.castle_image}
      source={require('../../images/castle.png')}
    />
  </View>
);
}

export default AuthorizeBanner