import React, { useRef } from 'react';
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
import LoginStyles from './PasswordControllerStyles';
import { toastic } from '../utils/utils';
import { loginSchema } from '../utils/shemas';


const PasswordController = () => {
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
    catch (er) {
      const errorText = Object.values(er.response.data)[0];
      toastic( errorText)
    }
  };

  return (
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

export default PasswordController;