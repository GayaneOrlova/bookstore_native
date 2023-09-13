import React, { useState } from 'react';
import { Controller, useForm } from "react-hook-form";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Image, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import Header from '../../Header/Header';
import Input from '../../Input/Input';
import Footer from '../../Footer/Footer';
import InputPasswordStyles from './InputPasswordStyles';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import Button from '../../Button/Button';
import { userPasswordChange } from '../../api/user.api/user.api';
import { setNewPassword } from '../../store/slices/userSlice';

const InputPassword = () => {
  const { control, handleSubmit, formState: { errors } } = useForm();
  const [showInputChange, setShowInputChange] = useState(false);
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.user.user);
  const userAvatar = useAppSelector(state => state.user.userProfile.avatar);

  const handlePress = () => {
    setShowInputChange(true);
  };

  const onSubmit = async (password: string, new_password: string, confirm_password: string) => {
    try {
      console.log('что тут:')
      const response = await userPasswordChange(password, new_password, confirm_password );
      // await AsyncStorage.setItem('access', response.data.tokens.access);
      dispatch(setNewPassword(response.data));
      console.log('Password', response.data);
    }
    catch (er) {
      console.log(er);
    }
  };

  return (
    <View>
      <View style={InputPasswordStyles.password_group}>
        <Text style={{ fontSize: 14 }}>Password</Text>
        <TouchableOpacity onPress={handlePress}>
          <Text style={InputPasswordStyles.change_text}>Change password</Text>
        </TouchableOpacity>
      </View>
      <Controller
        control={control}
        rules={{ maxLength: 15, }}
        render={({ field: { onChange, value } }) => (
          <View>
            <Input
              image_source={require('/Users/gayaneorlova/bookstore_native/images/icons/hide.png')}
              onChangeText={defaultValue => onChange(defaultValue)}
              defaultValue={value}
              placeholder={'nbm,.'}
              placeholderTextColor={'#344966'}
              // secureTextEntry
              style={InputPasswordStyles.input}
            />
            {!showInputChange ? (
              <Text style={InputPasswordStyles.input_description}>Your password</Text>
            ) : (
              <Text style={InputPasswordStyles.input_description}>Old password</Text>
            )}
          </View>
        )}
        name="password"
      />
      {showInputChange &&
        <>
          <Controller
            control={control}
            rules={{ maxLength: 15, }}
            render={({ field: { onChange, value } }) => (
              <Input
                image_source={require('/Users/gayaneorlova/bookstore_native/images/icons/hide.png')}
                onChangeText={defaultValue => onChange(defaultValue)}
                defaultValue={value}
                placeholder={'New password'}
                placeholderTextColor={'#344966'}
                // secureTextEntry
                style={InputPasswordStyles.input}
              />
            )}
            name="new_password"
          />
          <Text style={{ fontSize: 14, marginVertical: 10, }}>Enter your password</Text>
          <Controller
            control={control}
            rules={{ maxLength: 15, }}
            render={({ field: { onChange, value } }) => (
              <Input
                image_source={require('/Users/gayaneorlova/bookstore_native/images/icons/hide.png')}
                onChangeText={defaultValue => onChange(defaultValue)}
                defaultValue={value}
                placeholder={'Password replay'}
                placeholderTextColor={'#344966'}
                // secureTextEntry
                style={InputPasswordStyles.input}
              />
            )}
            name="confirm_password"
          />
          <Text style={{ fontSize: 14, marginVertical: 10, }}>Repeat your password without errors</Text>
          <Button style={InputPasswordStyles.button_confirm} text={'Confirm'}
            onPress={handleSubmit(onSubmit)} />
        </>
      }
    </View>
  );
};

export default InputPassword;

