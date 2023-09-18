import React from 'react';
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Image, Text, ScrollView } from 'react-native';
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";

import { useAppDispatch, useAppSelector } from '../store/hooks';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Button from '../Button/Button';
import Input from '../Input/Input';
import LoginStyles from './LoginStyles';
import { setUser, setUserProfile } from '../store/slices/userSlice';
import { userLogin, userProfile } from '../api/user.api/user.api';



type UserLogin = {
  email: string;
  password: string;
};

type Props = {
  text: UserLogin;
};


const Login: React.FC<Props> = props => {
  const dispatch = useAppDispatch();
  
  const schema = yup.object().shape({
    email: yup.string().email('Please enter a valid email').required('Email is required'),
    password: yup.string().required('Password is required'),
  });
  
  const { control, handleSubmit, formState: { errors } } = useForm<UserLogin>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (text: UserLogin) => {
    try {
      const response = await userLogin(text);
      await AsyncStorage.setItem('access', response.data.tokens.access);
      dispatch(setUser(response.data.user));
      try {
        const response = await userProfile();
        dispatch(setUserProfile(response.data));
        console.log(response.data)
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
                image_source={require('../../images/icons/mail.png')}
                onChangeText={onChange}
                defaultValue={value}
                placeholder='Email'
                placeholderTextColor='#B9BAC3'
              />
              <Text style={LoginStyles.input_description}>Enter your email</Text>
            </View>
          )}
          name="email"
        />
        {errors.email && <Text style={{ color: 'red' }}>{errors.email.message}</Text>}

        <Controller
          control={control}
          rules={{ maxLength: 15, }}
          render={({ field: { onChange, value } }) => (
            <View style={LoginStyles.input_group}>
              <Input
                image_source={require('../../images/icons/hide.png')}
                onChangeText={onChange}
                defaultValue={value}
                placeholder='Password'
                placeholderTextColor='#B9BAC3'
                secureTextEntry
              />
              <Text style={LoginStyles.input_description}>Enter your password</Text>
            </View>
          )}
          name="password"
        />
        {errors.password && <Text style={{ color: 'red' }}>{errors.password.message}</Text>}
        <Button text="Log In" style={LoginStyles.button} onPress={handleSubmit(onSubmit)} />
      </View>
      <Image style={LoginStyles.image} source={require('../../images/man-reader.png')} />
      <Footer />
    </ScrollView>
  );
};

export default Login;