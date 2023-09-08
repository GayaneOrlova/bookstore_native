import React from 'react';
import { Controller, useForm } from "react-hook-form";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Image, Text, ScrollView } from 'react-native';
import { useAppDispatch } from '../store/hooks';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Button from '../Button/Button';
import Input from '../Input/Input';
import LoginStyles from './LoginStyles';
import { setUser } from '../store/slices/userSlice';
import { userLogin } from '../api/user.api/user.api';

type UserLogin = {
  email: string;
  password: string;
  password_confirm?: string;
};

const Login = () => {
  const dispatch = useAppDispatch();
  const { control, handleSubmit, formState: { errors } } = useForm<UserLogin>();

  const onSubmit = async (data: UserLogin) => {
    try {
      const response = await userLogin(data.email, data.password);
      await AsyncStorage.setItem('access', response.data.tokens.access);
      dispatch(setUser(response.data.user));
      console.log(response.data.tokens.access);

    } catch (er) {
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
                onChangeText={onChange}
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
                onChangeText={onChange}
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

        {/* <Controller
          control={control}
          rules={{ maxLength: 15, }}
          render={({ field: { onChange, value } }) => (
            <View style={LoginStyles.input_group}>
              <Input
                image_source={require('/Users/gayaneorlova/bookstore_native/images/icons/hide.png')}
                onChangeText={onChange}
                defaultValue={value}
                placeholder={'Password replay'}
                placeholderTextColor={'#B9BAC3'}
                secureTextEntry
              />
              <Text style={LoginStyles.input_description}>Repeat your password without errors</Text>
            </View>
          )}
          name="сonfirm the password"
        /> */}
        <Button text="Log In" style={LoginStyles.button} onPress={handleSubmit(onSubmit)} />
        {/* или Sign up */}
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

