import React, { useEffect, useState } from 'react';
import { Controller, useForm } from "react-hook-form";
import { View, Image, Text, TouchableOpacity, Platform } from 'react-native';
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import ImagePicker from 'react-native-image-picker';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {changeAvatar, getAvatar } from '../../api/user.api/user.api';
import { setAvatar } from '../../store/slices/userSlice';
import Input from '../../Input/Input';
import Button from '../../Button/Button';
import InputProfileStyles from './InputProfileStyles';

import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import axios from 'axios';



const InputProfile = () => {
  const dispatch = useAppDispatch();
  const [showInputChange, setShowInputChange] = useState(false);
  const user = useAppSelector(state => state.user.user);
  const userName = useAppSelector(state => state.user.user.username);
  const userAvatar = useAppSelector(state => state.user.userAvatar);

  const fetchAvatar = async () => {
    try {
      const responce = await getAvatar();
      dispatch(setAvatar(responce.data.avatar));
      console.log('получение фото с сервера', responce.data.avatar, "аватар",userAvatar)
    }
    catch (er) {
      console.log(er);
    }
  }
  
  useEffect(() => {
    fetchAvatar();
  }, []);
  
  console.log('userAvatar', userAvatar)

  const handlePress = () => {
    setShowInputChange(true);
  };

  const handleClose = () => {
    setShowInputChange(false);
  };

  const schema = yup.object().shape({
    username: yup.string().required('Username is required'),
    email: yup.string().email().notRequired(),
  });

  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (value: {
    email?: yup.Maybe<string | undefined>;
    username: string;
  }) => {
    // try {
    //   const response = await changeProfile({ username: value.username });
    //   dispatch(setUserProfile(response.data));
    // }
    // catch (er) {
    //   console.log(er);
    // }
  };

 
  const [photo, setPhoto] = useState(null);

  const createFormData = (photo, body = {}) => {
    const data = new FormData();
    data.append('photo', {
      name: photo.assets[0].fileName,
      type: photo.assets[0].type,
      uri: Platform.OS === 'ios' ? photo.assets[0].uri.replace('file://', '') : photo.assets[0].uri,
    });
    console.log('photo.data', data)
    return data;
  };

  const handleImagePicker = async () => {
    const options: ImagePicker.ImageLibraryOptions = {
      mediaType: 'photo',
      includeBase64: false,
    };
    const response = await launchImageLibrary(options);
    if (response) {
      setPhoto(response);
    }
    console.log(response)
  }

  const handleUploadPhoto = async () => {
    if (!photo) {
      console.log('Фотография не выбрана');
      return;
    }
    // console.log(" user.id",  user.id)
    const imageFormData = createFormData(photo);
    console.log('imageFormData:', imageFormData);
    // console.log('photo:', photo);

    try {
      const response = await changeAvatar(imageFormData);
      dispatch(setAvatar(response.data.avatar));
      console.log("dispatch", response.data, "userAvatar", userAvatar)
    }
    catch (er) {
      console.log(er, 'dfghjkl;');
    }
  };
  
  

  

  return (
    <View>
      <View>
        {userAvatar && !photo ? (
          <Image style={InputProfileStyles.user_photo}
            source={{ uri: `${userAvatar}` }}
          />
        ) :
          <View style={InputProfileStyles.user_avatar_container}>
            {photo ? (
              <Image style={InputProfileStyles.user_avatar_icon}
                source={{ uri: `${userAvatar}` }}
              />
            ) : (
              <Image style={InputProfileStyles.user_avatar_icon}
                source={require('../../../images/icons/user_profile.png')}
              />
            )}
          </View>
        }

        <TouchableOpacity
          style={InputProfileStyles.camera_button}
          onPress={handleImagePicker}>
          <Image source={require('../../../images/icons/camera.png')} />
        </TouchableOpacity>
        {photo ?
          (<TouchableOpacity onPress={handleUploadPhoto}><Text>Upload</Text></TouchableOpacity>) : ''
        }
      </View>
      <Text style={InputProfileStyles.title}>Personal information</Text>
      <View style={InputProfileStyles.buttons_container}>
        <TouchableOpacity onPress={handlePress}>
          <Text style={InputProfileStyles.change_text}>Change information</Text>
        </TouchableOpacity>
        {showInputChange &&
          <TouchableOpacity onPress={handleClose}>
            <Text style={InputProfileStyles.change_text}>Close without change</Text>
          </TouchableOpacity>
        }
      </View>
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
        name="username"
      />
      {errors.username && <Text style={{ color: 'red' }}>{errors.username.message}</Text>}

      <Controller
        control={control}
        rules={{ required: true, }}
        render={({ field: { } }) => (
          <View>
            <Input
              image_source={require('../../../images/icons/mail.png')}
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
        <Button
          style={InputProfileStyles.button_confirm} text={'Confirm'}
          onPress={handleSubmit(onSubmit)}
        />
      }
    </View>

  );
};

export default InputProfile;
