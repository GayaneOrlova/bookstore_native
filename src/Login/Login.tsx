import React from 'react';
import { Controller, useForm } from "react-hook-form";
import { View, Image, Text, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { yupResolver } from "@hookform/resolvers/yup";

import { useAppDispatch } from '../store/hooks';
import {setUser } from '../store/slices/userSlice';
import {userLogin } from '../api/user.api/user.api';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Button from '../Button/Button';
import Input from '../Input/Input';
import loginStyles from './LoginStyles';

import { toast } from '../utils/utils';
import { loginSchema } from '../utils/shemas';
import { COLORS } from '../utils/colors';

type Props = {}

const Login: React.FC<Props> = () => {
  const dispatch = useAppDispatch();
  
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(loginSchema),
  });
  
  const onSubmit = async (text: {email: string;
    password: string;}) => {
    try {
      const response = await userLogin(text);
      await AsyncStorage.setItem('access', response.data.tokens.access);
      dispatch(setUser(response.data.user));  
    }
    catch (err: any) {
      const errorText = Object.values(err.response.data)[0];
      toast(errorText)
    }
  };

  return (
    <ScrollView>
      <Header />
      <View style={loginStyles.container}>
        <Text style={loginStyles.title}>Log In</Text>
        <Controller
          control={control}
          rules={{ required: true, }}
          render={({ field: { onChange, value } }) => (
            <View style={loginStyles.input_group}>
              <Input
                image_source={require('../../images/icons/mail.png')}
                onChangeText={onChange}
                defaultValue={value}
                placeholder='Email'
                placeholderTextColor={COLORS.dark_grey}
              />
              {errors.email ? (<Text style={loginStyles.error}>{errors.email.message}</Text>) :(
              <Text style={loginStyles.input_description}>Enter your email</Text>)
              }
            </View>
          )}
          name="email"
        />
        <Controller
          control={control}
          rules={{ maxLength: 15, }}
          render={({ field: { onChange, onBlur, value } }) => (
            <View style={loginStyles.input_group}>
              <Input
                image_source={require('../../images/icons/hide.png')}
                onChangeText={onChange}
                defaultValue={value}
                placeholder='Password'
                placeholderTextColor={COLORS.dark_grey}
                secureTextEntry
                onBlur={onBlur}
              />
              {errors.password ? (<Text style={loginStyles.error}>{errors.password.message}</Text>)
              : (
              <Text style={loginStyles.input_description}>Enter your password</Text>
              )}
            </View>
          )}
          name="password"
        />
        <Button text="Log In" style={loginStyles.button} onPress={handleSubmit(onSubmit)} />
      </View>
      <Image style={loginStyles.image} source={require('../../images/man-reader.png')} />
      <Footer />
    </ScrollView>
  );
};

export default Login;