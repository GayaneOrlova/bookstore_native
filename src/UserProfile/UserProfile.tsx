import React, { useState } from 'react';
import { Controller, useForm } from "react-hook-form";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Image, Text, ScrollView, TouchableOpacity } from 'react-native';
import Header from '../Header/Header';
import Input from '../Input/Input';
import Footer from '../Footer/Footer';
import UserProfileStyles from './UserProfileStyles';
import { useAppSelector } from '../store/hooks';
import Button from '../Button/Button';
import { userPasswordChange } from '../api/user.api/user.api';
import { setNewPassword } from '../store/slices/userSlice';

const UserProfile = () => {
  const { control, handleSubmit, formState: { errors } } = useForm();
  const [showInputChange, setShowInputChange] = useState(false);
  const user = useAppSelector(state => state.user.user);
  const userAvatar = useAppSelector(state => state.user.userAvatar.avatar);

  const handlePress = () => {
    setShowInputChange(true);
  };
  console.log('что тут:', email, password, new_password, confirm_password)
  const onSubmit = async (email: string, password: string, new_password: string, confirm_password: string) => {
   try {
         console.log('что тут:')
      const response = await userPasswordChange({email, password, new_password, confirm_password});
      // await AsyncStorage.setItem('access', response.data.tokens.access);
      dispatch(setNewPassword(response.data));
      }    
    catch (er) {
      console.log(er);
    }
  };
  
  return (
    <ScrollView>
      <Header />
      <View style={UserProfileStyles.container}>
      {userAvatar ? (
        <Image style={UserProfileStyles.user_photo}
          source={{ uri: `${userAvatar}` }}
        />
      ) :
      <View style={UserProfileStyles.user_avatar_container}>
      <Image style={UserProfileStyles.user_avatar_icon}
          source={require('/Users/gayaneorlova/bookstore_native/images/icons/user_profile.png')}
        />
        </View>
      }
        <Text style={UserProfileStyles.title}>Personal information</Text>
        <TouchableOpacity onPress={handlePress}>
          <Text style={UserProfileStyles.change_text}>Change information</Text>
        </TouchableOpacity>

        <Controller
          control={control}
          rules={{ required: true, }}
          render={({ field: { onChange, value } }) => (
            <View>
              <Input
                image_source={require('/Users/gayaneorlova/bookstore_native/images/icons/user__profile.png')}
                onChangeText={onChange}
                defaultValue={value}
                placeholder={user.username}
                placeholderTextColor={'#344966'}
                style={UserProfileStyles.input}
              />
              <Text style={UserProfileStyles.input_description}>Your name</Text>
            </View>
          )}
          name="name"
        />
        <Controller
          control={control}
          rules={{ required: true, }}
          render={({ field: { onChange, value } }) => (
            <View>
              <Input
                image_source={require('/Users/gayaneorlova/bookstore_native/images/icons/mail.png')}
                onChangeText={defaultValue => onChange(defaultValue)}
                defaultValue={user.email}
                placeholder={user.email}
                placeholderTextColor={'#344966'}
                style={UserProfileStyles.input}
              />
              <Text style={UserProfileStyles.input_description}>Your email</Text>
            </View>
          )}
          name="email"
        />
        <View style={UserProfileStyles.password_group}>
          <Text style={{ fontSize: 14 }}>Password</Text>
          <TouchableOpacity onPress={handlePress}>
            <Text style={UserProfileStyles.change_text}>Change password</Text>
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
                placeholder={'**********'}
                placeholderTextColor={'#344966'}
                secureTextEntry
                style={UserProfileStyles.input}
              />
              {!showInputChange ? (
                <Text style={UserProfileStyles.input_description}>Your password</Text>
              ) : (
                <Text style={UserProfileStyles.input_description}>Old password</Text>
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
                  secureTextEntry
                  style={UserProfileStyles.input}
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
                  secureTextEntry
                  style={UserProfileStyles.input}
                />
              )}
              name="confirm_password"
            />
            <Text style={{ fontSize: 14, marginVertical: 10, }}>Repeat your password without errors</Text>
            <Button style={UserProfileStyles.button_confirm} text={'Confirm'}
            onPress={handleSubmit(onSubmit)} />
          </>
        }
      </View>

      <Footer />
    </ScrollView>
  );
};

export default UserProfile;
function dispatch(arg0: any) {
  throw new Error('Function not implemented.');
}

