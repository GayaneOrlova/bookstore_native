import React, { useEffect, useState } from 'react';
import { Controller, useForm } from "react-hook-form";
import { View, Image, Text, TouchableOpacity, Platform } from 'react-native';
import ImagePicker, { launchImageLibrary, ImagePickerResponse } from 'react-native-image-picker';
import { yupResolver } from "@hookform/resolvers/yup";

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { changeAvatar, changeUserinfo, getAvatar } from '../../api/user.api/user.api';
import { setAvatar, setUser, setUsername } from '../../store/slices/userSlice';

import Input from '../../Input/Input';
import Button from '../../Button/Button';
import inputProfileStyles from './InputProfileStyles';

import { toast } from '../../utils/utils';
import { changeUserInfoSchema } from '../../utils/shemas';
import { COLORS } from '../../utils/colors';

type Props = {}

const InputProfile: React.FC<Props> = () => {
  const dispatch = useAppDispatch();
  const [showInputChange, setShowInputChange] = useState(false);
  const [photo, setPhoto] = useState<ImagePickerResponse>();

  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(changeUserInfoSchema),
  });

  const user = useAppSelector(state => state.user.user);
  const userName = useAppSelector(state => state.user.user.username);
  const userAvatar = useAppSelector(state => state.user.userAvatar.avatar);

  const fetchAvatar = async () => {
    try {
      const responce = await getAvatar();
      dispatch(setAvatar(responce.data.avatar));
    }
    catch (err: any) {
      const errorText = Object.values(err.response.data)[0];
      toast(errorText)
    }
  }

  useEffect(() => {
    fetchAvatar();
  }, []);

  const handlePress = () => {
    setShowInputChange(true);
  };

  const handleClose = () => {
    setShowInputChange(false);
  };

  const onChangeUserInfo = async (value: { username: any; }) => {
    console.log('ghjkl,./')
    try {
      const response = await changeUserinfo({ username: value.username });
      dispatch(setUsername(response.data));
      toast('Personal information was successfully changed!');
    }
    catch (err: any) {
      const errorText = Object.values(err.response.data)[0];
      toast(errorText);
    }
  };

  const createFormData = (photo: ImagePickerResponse, body = {}) => {
    const data = new FormData();
    data.append('photo', {
      name: photo.assets?.[0].fileName,
      type: photo.assets?.[0].type,
      uri: Platform.OS === 'ios' ? photo.assets?.[0].uri?.replace('file://', '') : photo.assets?.[0].uri,
    });
    return data;
  };

  const handleOpenGallery = async () => {
    const options: ImagePicker.ImageLibraryOptions = {
      mediaType: 'photo',
      includeBase64: false,
    };
    const response = await launchImageLibrary(options);
    if (!response.didCancel) {
      setPhoto(response);
    }
  };

  const handleUploadPhoto = async () => {
    const imageFormData = createFormData(photo!);
    try {
      const response = await changeAvatar(imageFormData);
      dispatch(setAvatar(response.data.avatar));
    }
    catch (err: any) {
      const errorText = Object.values(err.response.data)[0];
      toast(errorText);
    }
  };

  useEffect(() => {
    if (photo) {
      handleUploadPhoto();
    }
  }, [photo]);

  return (
    <View>
      <View>
        {userAvatar && !photo ? (
          <Image style={inputProfileStyles.user_photo} source={{ uri: `${userAvatar}` }} />
        ) : (
          <View>
            {photo ? (
              <Image style={inputProfileStyles.user_photo} source={{ uri: `${photo.assets?.[0].uri}` }} />
            ) : (
              <Image style={inputProfileStyles.user_avatar_icon} source={require('../../../images/icons/user_profile.png')} />
            )}
          </View>
        )}
        <View style={inputProfileStyles.change_photo_button}>
          <TouchableOpacity
            style={inputProfileStyles.camera_button}
            onPress={handleOpenGallery}>
            <Image source={require('../../../images/icons/camera.png')} />
          </TouchableOpacity>
        </View>
      </View>
      <Text style={inputProfileStyles.title}>Personal information</Text>
      <View style={inputProfileStyles.buttons_container}>

        <TouchableOpacity onPress={handlePress}>
          <Text style={inputProfileStyles.change_text}>Change information</Text>
        </TouchableOpacity>
        {showInputChange &&
          <TouchableOpacity onPress={handleClose}>
            <Text style={inputProfileStyles.change_text}>Close </Text>
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
              defaultValue={showInputChange ? value : userName}
              placeholder={userName}
              placeholderTextColor={COLORS.dark_blue}
              style={inputProfileStyles.input}
              editable={showInputChange}
            />
            <Text style={inputProfileStyles.input_description}>Your name</Text>
          </View>
        )}
        name="username"
      />
      {errors.username && showInputChange && <Text style={inputProfileStyles.error}>{errors.username.message}</Text>}
      <View>
        <Input
          image_source={require('../../../images/icons/mail.png')}
          value={user.email}
          placeholder={user.email}
          placeholderTextColor={COLORS.dark_blue}
          style={inputProfileStyles.input}
          editable={showInputChange}
          defaultValue={''}
        />
        <Text style={inputProfileStyles.input_description}>Your email</Text>
      </View>
      {showInputChange &&
        <Button
          style={inputProfileStyles.button_confirm} text={'Confirm'}
          onPress={handleSubmit(onChangeUserInfo)}
        />
      }
    </View>

  );
};

export default InputProfile;
