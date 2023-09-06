import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {View, TouchableOpacity, Image, TextInput, Button, Text} from 'react-native';
import Header from '../Header/Header';
import LoginStyles from './LoginStyles';
// import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = () => {
 
  return (
    <View>
      <Header />
      <View style={LoginStyles.login_container}>
        <Text style={LoginStyles.login_title}>Log In</Text>
      </View>
    </View>
  );
};

export default Login;
