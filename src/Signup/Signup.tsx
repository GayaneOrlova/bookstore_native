import React from 'react';
import { Controller, useForm } from "react-hook-form";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Image, Text, ScrollView } from 'react-native';
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";

import { useAppDispatch } from '../store/hooks';
import { setUser } from '../store/slices/userSlice';
import {userSignUp } from '../api/user.api/user.api';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Button from '../Button/Button';
import Input from '../Input/Input';
import SignupStyles from './SignupStyles';

type UserRegistrationType = {
  email: string;
  password: string;
  confirm_password: string;
};

const Signup = () => {
  const dispatch = useAppDispatch();
  
  const schema = yup.object().shape({
    email: yup.string().email('Please enter a valid email').required('Email is required'),
    password: yup.string().required('Password is required'),
    confirm_password: yup.string().oneOf([yup.ref('password')], 'Passwords must match').required('Confirm password is required'),
  });

  const { control, handleSubmit, formState: { errors } } = useForm<UserRegistrationType>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (text: UserRegistrationType) => {
    try {      
      const response = await userSignUp(text);
      await AsyncStorage.setItem('access', response.data.tokens.access);
      dispatch(setUser(response.data.user));
    } catch (er) {
      console.log(er);
    }
  };
  
  return (
    <ScrollView>
      <Header />
      <View style={SignupStyles.container}>
        <Text style={SignupStyles.title}>Sign Up</Text>
        <Controller
          control={control}
          rules={{ required: true, }}
          render={({ field: { onChange, value } }) => (
            <View style={SignupStyles.input_group}>
              <Input
                image_source={require('../../images/icons/mail.png')}
                onChangeText={onChange}
                defaultValue={value}
                placeholder='Email'
                placeholderTextColor='#B9BAC3'
              />
              <Text style={SignupStyles.input_description}>Enter your email</Text>
            </View>
          )}
          name="email"
        />
        {errors.email && <Text style={SignupStyles.error}>{errors.email.message}</Text>}
        
        <Controller
          control={control}
          rules={{ maxLength: 15, }}
          render={({ field: { onChange, value } }) => (
            <View style={SignupStyles.input_group}>
              <Input
                image_source={require('../../images/icons/hide.png')}
                onChangeText={onChange}
                defaultValue={value}
                placeholder='Password'
                placeholderTextColor='#B9BAC3'
                secureTextEntry
              />
              <Text style={SignupStyles.input_description}>Enter your password</Text>
            </View>
          )}
          name="password"
        />
        {errors.password && <Text style={SignupStyles.error}>{errors.password.message}</Text>}
      
        <Controller
          control={control}
          rules={{ maxLength: 15, }}
          render={({ field: { onChange, value } }) => (
            <View style={SignupStyles.input_group}>
              <Input
                image_source={require('../../images/icons/hide.png')}
                onChangeText={onChange}
                defaultValue={value}
                placeholder='Password replay'
                placeholderTextColor='#B9BAC3'
                secureTextEntry
              />
              <Text style={SignupStyles.input_description}>Repeat your password without errors</Text>
            </View>
          )}
          name="confirm_password"
        />
        {errors.confirm_password && <Text style={SignupStyles.error}>{errors.confirm_password.message}</Text>}

        <Button text="Sign Up" style={SignupStyles.button} onPress={handleSubmit(onSubmit)} />
      </View>
      <Image style={SignupStyles.image} source={require('../../images/man-reader.png')} />
      <Footer />
    </ScrollView>
  );
};

export default Signup;


