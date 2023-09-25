import React, { useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useAppSelector } from '../store/hooks';
import HeaderStyles from './HeaderStyles';
import Search from './Search/Search';
import Button from '../Button/Button';
import UserButton from '../UserButton/UserButton';

type RootStackParamList = {
  Login: undefined;
  Signup: undefined;
  UserProfile: undefined;
  Cart: undefined;
  Homepage: undefined;
};

type NavigationProps = StackNavigationProp<RootStackParamList>;


const Header = () => {
  const isUser = useAppSelector(state => state.user.user);

  const navigation = useNavigation<NavigationProps>();
  const onLoginPage = () => {
    navigation.navigate('Login');
  };

  const onSignupPage = () => {
    navigation.navigate('Signup');
  };

  const onUserProfilePage = () => {
    navigation.navigate('UserProfile');
  }

  const onCartPage = () => {
    navigation.navigate('Cart');
  }
  
  const onHomepage = () => {
    navigation.navigate('Homepage');
  };
  
  return (
    <>
      <View style={HeaderStyles.header_container}>
        <Image
          source={require('../../images/icons/logo.png')}
          style={HeaderStyles.header_logo}
        />
        <TouchableOpacity onPress={onHomepage}>
        <Text style={HeaderStyles.header_text}>Catalog</Text>
        </TouchableOpacity>
        {!isUser.email ? (
          <View style={HeaderStyles.header_button_container}>
            <Button
              text="Log In"
              style={HeaderStyles.header_button}
              onPress={onLoginPage}
            />
            <Button
              text="Sing Up"
              style={HeaderStyles.header_button}
              onPress={onSignupPage}
            />
          </View>
        ) : (
          <View style={HeaderStyles.header_user_button}>
            <UserButton image_source={require('../../images/icons/cart.png')}
              onPress={onCartPage} />
            <UserButton image_source={require('../../images/icons/heart.png')} />
            <UserButton
              image_source={require('../../images/icons/userrprofile.png')}
              onPress={onUserProfilePage}
            />
          </View>
        )}
      </View>
      <Search />
    </>
  );
  };

export default Header;
