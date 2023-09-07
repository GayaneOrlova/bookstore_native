import React from 'react';
import { Controller, useForm } from "react-hook-form";
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, TouchableOpacity, Image, TextInput, Text, ScrollView } from 'react-native';
import Header from '../Header/Header';
import LoginStyles from './LoginStyles';
import { useAppDispatch } from '../store/hooks';
import Button from '../Button/Button';

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
    <ScrollView>
      <Header />
      <View style={LoginStyles.container}>
        <Text style={LoginStyles.title}>Log In</Text>

        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, value } }) => (
            <View style={LoginStyles.input_group}>
              <View style={LoginStyles.input_form}>
                <Image
                  source={require('/Users/gayaneorlova/bookstore_native/images/icons/mail.png')}
                  style={LoginStyles.input_icon}
                />
                <TextInput
                  placeholder="Email"
                  onChangeText={onChange}
                  value={value}
                />
              </View>

              <Text style={LoginStyles.input_description}>Enter your email</Text>
            </View>
          )}
          name="email"
        />
        {errors.Email && <Text>This is required.</Text>}

        <Controller
          control={control}
          rules={{ maxLength: 15, }}
          render={({ field: { onChange, value } }) => (
            <View style={LoginStyles.input_group}>
              <View style={LoginStyles.input_form}>
                <Image
                  source={require('/Users/gayaneorlova/bookstore_native/images/icons/hide.png')}
                  style={LoginStyles.input_icon}
                />
                <TextInput
                  placeholder="Password"
                  onChangeText={onChange}
                  value={value}
                  secureTextEntry
                />
              </View>
              <Text style={LoginStyles.input_description}>Enter your password</Text>
            </View>
          )}
          name="password"
        />

        <Controller
          control={control}
          rules={{ maxLength: 15, }}
          render={({ field: { onChange, value } }) => (
            <View style={LoginStyles.input_group}>
              <View style={LoginStyles.input_form}>
                <Image
                  source={require('/Users/gayaneorlova/bookstore_native/images/icons/hide.png')}
                  style={LoginStyles.input_icon}
                />
                <TextInput
                  placeholder="Password replay"
                  onChangeText={onChange}
                  value={value}
                  secureTextEntry
                />
              </View>
              <Text style={LoginStyles.input_description}>Repeat your password without errors</Text>
            </View>
          )}
          name="сonfirm the password"
        />
        <Button text="Log In" style={LoginStyles.button} onPress={handleSubmit(onSubmit)} />
        {/* или Sign up */}
      </View>
      <Image style={LoginStyles.image} source={require('/Users/gayaneorlova/bookstore_native/images/man-reader.png')} />
    </ScrollView>
  );
};

export default Login;
