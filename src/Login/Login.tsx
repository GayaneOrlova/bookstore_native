import React from 'react';
import { Controller, useForm } from "react-hook-form";
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, TouchableOpacity, Image, TextInput, Button, Text } from 'react-native';
import Header from '../Header/Header';
import LoginStyles from './LoginStyles';
import { useAppDispatch } from '../store/hooks';

const Login = () => {
  const dispatch = useAppDispatch();

  const { control, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async () => {
    try {
      // const response = await postUser({email, password});
      // await AsyncStorage.setItem('access', response.data.tokens.access);
      // dispatch(setUser(response.data.user));
    } catch (er) {
      console.log(er);
    }
  };

  return (
    <View>
      <Header />
      <View style={LoginStyles.login_container}>
        <Text style={LoginStyles.login_title}>Log In</Text>

        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              placeholder="Email"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="Email"
        />
        {errors.Email && <Text>This is required.</Text>}

        <Controller
          control={control}
          rules={{
            maxLength: 100,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="Last name"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="lastName"
        />

        <Button title="Submit" onPress={handleSubmit(onSubmit)} />
      </View>
    </View>
  );
};

export default Login;
