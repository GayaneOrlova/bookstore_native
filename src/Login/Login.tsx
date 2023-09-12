import React from 'react';
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Image, Text, ScrollView } from 'react-native';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Button from '../Button/Button';
import Input from '../Input/Input';
import LoginStyles from './LoginStyles';
import { setUser, setUserProfile } from '../store/slices/userSlice';
import {userLogin, userProfile } from '../api/user.api/user.api';

// type UserLogin = {
//   email: string;
//   password: string;
//   password_confirm?: string;
// };

const Login = () => {
  const dispatch = useAppDispatch();
  const { control, handleSubmit, formState: { errors } } = useForm();
  
  const onSubmit = async (email:string, password: string) => {
    try {
      const response = await userLogin(email, password);
      await AsyncStorage.setItem('access', response.data.tokens.access);
      dispatch(setUser(response.data.user));
      try {
          const response = await userProfile();
          console.log(response.data);
          dispatch(setUserProfile(response.data));
        } catch (er) {
          console.log(er);
        }
      }    
    catch (er) {
      console.log(er);
    }
  };
  
  return (
    <ScrollView>
      <Header />
      <View style={LoginStyles.container}>
        <Text style={LoginStyles.title}>Log In</Text>
        <Controller
          control={control}
          rules={{ required: true, }}
          render={({ field: { onChange, value } }) => (
            <View style={LoginStyles.input_group}>
              <Input
                image_source={require('/Users/gayaneorlova/bookstore_native/images/icons/mail.png')}
                onChangeText={defaultValue => onChange(defaultValue)}
                defaultValue={value}
                placeholder={'Email'}
                placeholderTextColor={'#B9BAC3'}
              />
              <Text style={LoginStyles.input_description}>Enter your email</Text>
            </View>
          )}
          name="email"
        />
        {/* {errors.Email && <Text>This is required.</Text>} */}

        <Controller
          control={control}
          rules={{ maxLength: 15, }}
          render={({ field: { onChange, value } }) => (
            <View style={LoginStyles.input_group}>
              <Input
                image_source={require('/Users/gayaneorlova/bookstore_native/images/icons/hide.png')}
                onChangeText={defaultValue => onChange(defaultValue)}
                defaultValue={value}
                placeholder={'Password'}
                placeholderTextColor={'#B9BAC3'}
                secureTextEntry
              />
              <Text style={LoginStyles.input_description}>Enter your password</Text>
            </View>
          )}
          name="password"
        />
        <Button text="Log In" style={LoginStyles.button} onPress={handleSubmit(onSubmit)} />
      </View>
      <Image style={LoginStyles.image} source={require('/Users/gayaneorlova/bookstore_native/images/man-reader.png')} />
      <Footer />
    </ScrollView>
  );
};

export default Login;
function setEmail(text: any) {
  throw new Error('Function not implemented.');
}

function setPassword(text: any) {
  throw new Error('Function not implemented.');
}

