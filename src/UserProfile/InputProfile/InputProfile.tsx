import React, { useEffect, useState } from 'react';
import { Controller, useForm } from "react-hook-form";
import { View, Image, Text, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { changeProfile, userPasswordChange, userProfile } from '../../api/user.api/user.api';
import { setNewPassword, setUserProfile } from '../../store/slices/userSlice';
import Input from '../../Input/Input';
import Button from '../../Button/Button';
import InputProfileStyles from './InputProfileStyles';
import UserProfile from '../UserProfile';
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";

// type UserLoginType = {
//   password: string;
//   new_password: string;
//   confirm_password: string;
// };

const InputProfile = () => {
  const dispatch = useAppDispatch();
  const [showInputChange, setShowInputChange] = useState(false);
  const user = useAppSelector(state => state.user.user);
  const userAvatar = useAppSelector(state => state.user.userProfile.avatar);
  const userName = useAppSelector(state => state.user.userProfile.bio);

  const handlePress = () => {
    setShowInputChange(true);
  };

  const schema = yup.object().shape({
    bio: yup.string().required('Username is required'),
    email: yup.string().required('Username is required'),
  });
  
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const fetchUserProfile = async () => {
    try {
      const responce = await userProfile();
      dispatch(setUserProfile(responce.data));
      console.log(responce.data)
    }
    catch (er) {
      console.log(er);
    }
  }

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const onSubmit = async (text) => {
    try {
    console.log(text)
      const response = await changeProfile(text);
      dispatch(setUserProfile(response.data));
      console.log(response.data)
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
        name="bio"
      />
      <Controller
        control={control}
        rules={{ required: true, }}
        render={({ field: { onChange, value } }) => (
          <View>
            <Input
              image_source={require('../../../images/icons/mail.png')}
              onChangeText={onChange}
              defaultValue={value}
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

