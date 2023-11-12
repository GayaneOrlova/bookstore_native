import React from 'react';
import { useForm } from "react-hook-form";
import { View, Image, Text, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { yupResolver } from "@hookform/resolvers/yup";

import { useAppDispatch } from '../../../store/hooks';
import { setUser } from '../../../store/slices/userSlice';
import { userLogin } from '../../../api/user.api/user.api';

import Header from '../../Header/Header';
import Footer from '../../Footer/Footer';
import Button from '../../Button/Button';
import loginStyles from './LoginStyles';

import { toast } from '../../../utils/utils';
import { loginSchema } from '../../../utils/shemas';
import ControllerEmail from '../Controllers/ControllerEmail';
import ControllerPassword from '../Controllers/ControllerPassword';

type Props = {}

const Login: React.FC<Props> = () => {
  const dispatch = useAppDispatch();

  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (text: {
    email: string;
    password: string;
  }) => {
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
        <ControllerEmail control={control} errors={errors} />
        <ControllerPassword control={control} errors={errors} placeholder={'Password'} input_description={'Enter your password'} name='password' />
        <Button text="Log In" style={loginStyles.button} onPress={handleSubmit(onSubmit)} />
      </View>
      <Image style={loginStyles.image} source={require('../../../images/man-reader.png')} />
      <Footer />
    </ScrollView>
  );
};

export default Login;