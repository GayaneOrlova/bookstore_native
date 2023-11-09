import React from 'react';
import { Controller, useForm } from "react-hook-form";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView } from 'react-native-gesture-handler';
import { View, Image, Text } from 'react-native';
import { yupResolver } from "@hookform/resolvers/yup";

import { useAppDispatch } from '../../store/hooks';
import { setUser } from '../../store/slices/userSlice';
import { userSignUp } from '../../api/user.api/user.api';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Button from '../Button/Button';
import Input from '../Input/Input';

import signupStyles from './SignupStyles';

import { toast } from '../../utils/utils';
import { signupSchema } from '../../utils/shemas';
import { COLORS } from '../../utils/colors';

type Props = {}

type UserRegistrationType = {
  email: string;
  password: string;
  confirm_password: string;
};

const Signup: React.FC<Props> = () => {
  const dispatch = useAppDispatch();
  const { control, handleSubmit, formState: { errors } } = useForm<UserRegistrationType>({
    resolver: yupResolver(signupSchema),
  });

  const onSubmit = async (text: UserRegistrationType) => {
    try {
      const response = await userSignUp(text);
      await AsyncStorage.setItem('access', response.data.tokens.access);
      dispatch(setUser(response.data.user));
    } catch (err: any) {
      const errorText = Object.values(err.response.data)[0];
      toast(errorText)
    }
  };


  return (
    <ScrollView>
      <Header />
      <View style={signupStyles.container}>
        <Text style={signupStyles.title}>Sign Up</Text>
        <Controller
          control={control}
          rules={{ required: true, }}
          render={({ field: { onChange, value } }) => (
            <View style={signupStyles.input_group}>
              <Input
                image_source={require('../../images/icons/mail.png')}
                onChangeText={onChange}
                defaultValue={value}
                placeholder='Email'
                placeholderTextColor={COLORS.dark_grey}
              />
              {errors.email ? (<Text style={signupStyles.error}>{errors.email.message}</Text>) : (
                <Text style={signupStyles.input_description}>Enter your email</Text>)
              }
            </View>
          )}
          name="email"
        />
        <Controller
          control={control}
          rules={{ maxLength: 15, }}
          render={({ field: { onChange, value } }) => (
            <View style={signupStyles.input_group}>
              <Input
                image_source={require('../../images/icons/hide.png')}
                onChangeText={onChange}
                defaultValue={value}
                placeholder='Password'
                placeholderTextColor={COLORS.dark_grey}
                secureTextEntry
              />
              {errors.password ? (<Text style={signupStyles.error}>{errors.password.message}</Text>)
                : (
                  <Text style={signupStyles.input_description}>Enter your password</Text>
                )}
            </View>
          )}
          name="password"
        />
        <Controller
          control={control}
          rules={{ maxLength: 15, }}
          render={({ field: { onChange, value } }) => (
            <View style={signupStyles.input_group}>
              <Input
                image_source={require('../../images/icons/hide.png')}
                onChangeText={onChange}
                defaultValue={value}
                placeholder='Password replay'
                placeholderTextColor={COLORS.dark_grey}
                secureTextEntry
              />
              {errors.confirm_password ? (<Text style={signupStyles.error}>{errors.confirm_password.message}</Text>)
                : (
                  <Text style={signupStyles.input_description}>Repeat your password without errors</Text>
                )}
            </View>
          )}
          name="confirm_password"
        />
        <Button text="Sign Up" style={signupStyles.button} onPress={handleSubmit(onSubmit)} />
      </View>
      <Image style={signupStyles.image} source={require('../../images/man-reader.png')} />
      <Footer />
    </ScrollView>
  );
};

export default Signup;
