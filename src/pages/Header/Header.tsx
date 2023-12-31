import React, { Dispatch, SetStateAction, useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { useAppSelector } from '../../store/hooks';

import headerStyles from './HeaderStyles';
import Button from '../../pages/Button/Button';
import UserButton from '../UserButton/UserButton';
import UserButtonStyles from '../UserButton/UserButtonStyles';

type Props = {};

type RootStackParamList = {
  Login: undefined;
  Signup: any;
  UserProfile: undefined;
  Cart: undefined;
  Homepage: undefined;
  FavoritesPage: undefined;
};

type NavigationProps = StackNavigationProp<RootStackParamList>;

const Header: React.FC<Props> = (props) => {
  const navigation = useNavigation<NavigationProps>();
  const isUser = useAppSelector(state => state.user.user);
  
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
  const onFavoritePage = () => {
    navigation.navigate('FavoritesPage');
  };
  const onHomepage = () => {
    navigation.navigate('Homepage');
  };

  return (
    <>
      <View style={headerStyles.header_container}>
        <Image
          source={require('../../images/icons/logo.png')}
          style={headerStyles.header_logo}
        />
        <TouchableOpacity onPress={onHomepage}>
          <Text style={headerStyles.header_text}>Catalog</Text>
        </TouchableOpacity>
        {!isUser.email ? (
          <View style={headerStyles.header_button_container}>
            <Button
              text="Log In"
              style={headerStyles.header_button}
              onPress={onLoginPage}
            />
            <Button
              text="Sing Up"
              style={headerStyles.header_button}
              onPress={onSignupPage}
            />
          </View>
        ) : (
          <View style={headerStyles.header_user_button}>
            <UserButton
              image_source={require('../../images/icons/cart.png')}
              onPress={onCartPage}
            />
            {isUser.cart_items_count &&
              <View style={UserButtonStyles.cart_index}>
                <Text style={UserButtonStyles.button_index_count}>{isUser.cart_items_count}</Text>
              </View>
            }
            <UserButton onPress={onFavoritePage} image_source={require('../../images/icons/heart.png')} />
            {isUser.favorites_count !==0 &&
              <View style={UserButtonStyles.favorite_index}>
                <Text style={UserButtonStyles.button_index_count}>{isUser.favorites_count}</Text>
              </View>
            }
            <UserButton
              image_source={require('../../images/icons/userrprofile.png')}
              onPress={onUserProfilePage}
            />
          </View>
        )}
      </View>
      {/* <Search searchValue={props.searchValue} setSearchValue={props.setSearchValue}/> */}
    </>
  );
};

export default Header;
