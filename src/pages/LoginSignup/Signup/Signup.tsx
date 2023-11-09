import React from 'react';
import { useForm } from "react-hook-form";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView } from 'react-native-gesture-handler';
import { View, Image, Text } from 'react-native';
import { yupResolver } from "@hookform/resolvers/yup";

import { useAppDispatch } from '../../../store/hooks';
import { setUser } from '../../../store/slices/userSlice';
import { userSignUp } from '../../../api/user.api/user.api';

import Header from '../../Header/Header';
import Footer from '../../Footer/Footer';
import Button from '../../Button/Button';

import signupStyles from './SignupStyles';

import { toast } from '../../../utils/utils';
import { signupSchema } from '../../../utils/shemas';
import ControllerEmail from '../Controllers/ControllerEmail';
import ControllerPassword from '../Controllers/ControllerPassword';

type Props = {}

type UserRegistrationType = {
  email: string;
  password: string;
  confirm_password: string;
};

const Signup: React.FC<Props> = () => {
  const dispatch = useAppDispatch();
  const { control, handleSubmit, formState: { errors } } = useForm({
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
        <ControllerEmail control={control} errors={errors} />
        <ControllerPassword control={control} errors={errors} placeholder={'Password'} input_description={'Enter your password'} name={'password'} />
        <ControllerPassword control={control} errors={errors} placeholder={'Password replay'} input_description={'Repeat your password without errors'} name={'confirm_password'} />
        <Button text="Sign Up" style={signupStyles.button} onPress={handleSubmit(onSubmit)} />
      </View>
      <Image style={signupStyles.image} source={require('../../images/man-reader.png')} />
      <Footer />
    </ScrollView>
  );
};

export default Signup;
