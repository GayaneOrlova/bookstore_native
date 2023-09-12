import React from 'react';
import { Controller, useForm } from "react-hook-form";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Image, Text, ScrollView, TouchableOpacity } from 'react-native';
import Header from '../Header/Header';
import Input from '../Input/Input';
import Footer from '../Footer/Footer';
import UserProfileStyles from './UserProfileStyles';
import { useAppSelector } from '../store/hooks';

const UserProfile = () => {
  const user = useAppSelector(state => state.user.user);
  
  const userAvatar = useAppSelector(state => state.user.userAvatar.avatar);

  console.log('aaaaa', userAvatar)
  const { control, handleSubmit, formState: { errors } } = useForm();

  const handlePress = () => {
  };


  return (
    <ScrollView>
      <Header />
      <View style={UserProfileStyles.container}>
        <Image style={UserProfileStyles.user_photo}
        source={{uri: `${userAvatar}`}}
        />
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
                placeholder={user.username} //здесь будет информация об имени пользователя
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
                onChangeText={onChange}
                defaultValue={value}
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
                onChangeText={onChange}
                defaultValue={value}
                placeholder={'**********'}
                placeholderTextColor={'#344966'}
                secureTextEntry
                style={UserProfileStyles.input}
              />
              <Text style={UserProfileStyles.input_description}>Your password</Text>
            </View>
          )}
          name="password"
        />
      </View>
      <Footer />
    </ScrollView>
  );
};

export default UserProfile;
