import React from 'react';
import { Image, Text, View } from 'react-native';
import HeaderStyles from './HeaderStyles';
import Search from './Search/Search';
import Button from '../Button/Button';
import { useNavigation } from '@react-navigation/native';
import UserButton from '../UserButton/UserButton';

const Header = () => {
  const navigation = useNavigation();
  const onLoginPage = () => {
    navigation.navigate('Login');
  };
  
  const onUserProfilePage = () => {
    navigation.navigate('UserProfile');
  }

  return (
    <>
      <View style={HeaderStyles.header_container}>
        <Image
          source={require('/Users/gayaneorlova/bookstore_native/images/icons/logo.png')}
          style={HeaderStyles.header_logo}
        />
        <Text style={HeaderStyles.header_text}>Catalog</Text>
        <Button
          text="Log In/ Sing Up"
          style={HeaderStyles.header_button}
          onPress={onLoginPage}
        />
        {/* !!!!!!сделать логику - если пользователь зашел на сайт - отобразить кнопки: */}
        <View style={HeaderStyles.header_user_button}>
          <UserButton image_source={require('/Users/gayaneorlova/bookstore_native/images/icons/cart.png')} />
          <UserButton image_source={require('/Users/gayaneorlova/bookstore_native/images/icons/heart.png')} />
          <UserButton
            image_source={require('/Users/gayaneorlova/bookstore_native/images/icons/user_profile.png')}
            onPress={onUserProfilePage}
          />
        </View>
      </View>
      <Search />
    </>
  );
};

export default Header;
