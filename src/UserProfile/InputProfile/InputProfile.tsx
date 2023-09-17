import React, { useState } from 'react';
import { Controller, useForm } from "react-hook-form";
import { View, Image, Text, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { userPasswordChange } from '../../api/user.api/user.api';
import { setNewPassword } from '../../store/slices/userSlice';
import Input from '../../Input/Input';
import Button from '../../Button/Button';
import InputProfileStyles from './InputProfileStyles';

// type UserLoginType = {
//   password: string;
//   new_password: string;
//   confirm_password: string;
// };

const InputProfile = () => {
  const { control, handleSubmit, formState: { errors } } = useForm();
  const dispatch = useAppDispatch();
  const [showInputChange, setShowInputChange] = useState(false);
  const user = useAppSelector(state => state.user.user);
  const userAvatar = useAppSelector(state => state.user.userProfile.avatar);
  const userName = useAppSelector(state => state.user.userProfile.bio);

  const handlePress = () => {
    setShowInputChange(true);
  };
  
  const onSubmit = async (email: string, password: string, new_password: string, confirm_password: string) => {
   try {
      const response = await userPasswordChange({email, password, new_password, confirm_password});
      // await AsyncStorage.setItem('access', response.data.tokens.access);
      dispatch(setNewPassword(response.data));
      }    
    catch (er) {
      console.log(er);
    }
  };
  
  return (
      <View>
      {userAvatar ? (
        <Image style={InputProfileStyles.user_photo}
          source={{ uri: `${userAvatar}` }}
        />
      ) :
      <View style={InputProfileStyles.user_avatar_container}>
      <Image style={InputProfileStyles.user_avatar_icon}
          source={require('../../../images/icons/user_profile.png')}
        />
        </View>
      }
        <Text style={InputProfileStyles.title}>Personal information</Text>
        <TouchableOpacity onPress={handlePress}>
          <Text style={InputProfileStyles.change_text}>Change information</Text>
        </TouchableOpacity>
        <Controller
          control={control}
          rules={{ required: true, }}
          render={({ field: { onChange, value } }) => (
            <View>
              <Input
                image_source={require('../../../images/icons/user__profile.png')}
                onChangeText={onChange}
                defaultValue={value}
                placeholder={userName}
                placeholderTextColor='#344966'
                style={InputProfileStyles.input}
              />
              <Text style={InputProfileStyles.input_description}>Your name</Text>
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
                image_source={require('../../../images/icons/mail.png')}
                onChangeText={onChange}
                defaultValue={user.email}
                placeholder={user.email}
                placeholderTextColor='#344966'
                style={InputProfileStyles.input}
              />
              <Text style={InputProfileStyles.input_description}>Your email</Text>
            </View>
            
          )}
          name="email"
        />
        {showInputChange &&
         <Button style={InputProfileStyles.button_confirm} text={'Confirm'}
         onPress={handleSubmit(onSubmit)} />
       }
      </View>

  );
};

export default InputProfile;

