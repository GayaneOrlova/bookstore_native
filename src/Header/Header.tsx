import React from 'react';
import { Image, Text, View } from 'react-native';
import HeaderStyles from './HeaderStyles';
import Search from './Search/Search';
import Button from '../Button/Button';
import { useNavigation } from '@react-navigation/native';
import UserButton from '../UserButton/UserButton';
import { useAppSelector } from '../store/hooks';

const Header = () => {
  const isUser = useAppSelector(state => state.user.user);
  
  const navigation = useNavigation();
  const onLoginPage = () => {
    navigation.navigate('Login');
  };
  
  const onSignupPage = () => {
    navigation.navigate('Signup')
  };

  const onUserProfilePage = () => {
    navigation.navigate('UserProfile');
  }

  const onCartPage = () => {
    navigation.navigate('Cart');
  }
  return (
    <>
      <View style={HeaderStyles.header_container}>
        <Image
          source={require('/Users/gayaneorlova/bookstore_native/images/icons/logo.png')}
          style={HeaderStyles.header_logo}
        />
        <Text style={HeaderStyles.header_text}>Catalog</Text>
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
            <UserButton image_source={require('/Users/gayaneorlova/bookstore_native/images/icons/cart.png')}
              onPress={onCartPage} />
            <UserButton image_source={require('/Users/gayaneorlova/bookstore_native/images/icons/heart.png')} />
            <UserButton
              image_source={require('/Users/gayaneorlova/bookstore_native/images/icons/user_profile.png')}
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
