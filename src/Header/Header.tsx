import React from 'react';
import {Image, Text, View} from 'react-native';
import HeaderStyles from './HeaderStyles';
import Search from './Search/Search';
import Button from '../Button/Button';
import {useNavigation} from '@react-navigation/native';

const Header = () => {
  const navigation = useNavigation();
  const onLoginPage = () => {
    navigation.navigate('Login');
  };

  return (
    <>
      <View style={HeaderStyles.container}>
        <Image
          source={require('/Users/gayaneorlova/bookstore_native/images/icons/logo.png')}
          style={HeaderStyles.logo}
        />
        <Text style={HeaderStyles.text}>Catalog</Text>
        <Button
          text="Log In/ Sing Up"
          style={HeaderStyles.button}
          onPress={onLoginPage}
        />
      </View>
      <Search />
    </>
  );
};

export default Header;
