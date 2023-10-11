import React, { useRef } from 'react';
import { Controller, useForm } from "react-hook-form";
import { View, Image, Text, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";

import { useAppDispatch } from '../store/hooks';
import {setUser } from '../store/slices/userSlice';
import {userLogin } from '../api/user.api/user.api';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Button from '../Button/Button';
import Input from '../Input/Input';
import LoginStyles from './LoginStyles';
import { toastic } from '../utils/utils';


const Login = () => {

  const dispatch = useAppDispatch();
  const schema = yup.object().shape({
    email: yup.string().email('Please enter a valid email').required('Email is required'),
    password: yup.string().required('Password is required'),
  });

  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });
  
  const onSubmit = async (text: {email: string;
    password: string;}) => {
    try {
      const response = await userLogin(text);
      await AsyncStorage.setItem('access', response.data.tokens.access);
      dispatch(setUser(response.data.user));  
    }
    catch (er) {
      const errorText = Object.values(er.response.data)[0];
      toastic( errorText)
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
                image_source={require('../../images/icons/mail.png')}
                onChangeText={onChange}
                defaultValue={value}
                placeholder='Email'
                placeholderTextColor='#B9BAC3'
              />
              {errors.email ? (<Text style={LoginStyles.error}>{errors.email.message}</Text>) :(
              <Text style={LoginStyles.input_description}>Enter your email</Text>)
              }
            </View>
          )}
          name="email"
        />
        <Controller
          control={control}
          rules={{ maxLength: 15, }}
          render={({ field: { onChange, onBlur, value } }) => (
            <View style={LoginStyles.input_group}>
              <Input
                image_source={require('../../images/icons/hide.png')}
                onChangeText={onChange}
                defaultValue={value}
                placeholder='Password'
                placeholderTextColor='#B9BAC3'
                secureTextEntry
                onBlur={onBlur}
              />
              {errors.password ? (<Text style={LoginStyles.error}>{errors.password.message}</Text>)
              : (
              <Text style={LoginStyles.input_description}>Enter your password</Text>
              )}
            </View>
          )}
          name="password"
        />
        <Button text="Log In" style={LoginStyles.button} onPress={handleSubmit(onSubmit)} />
      </View>
      <Image style={LoginStyles.image} source={require('../../images/man-reader.png')} />
      <Footer />
    </ScrollView>
  );
};

export default Login;