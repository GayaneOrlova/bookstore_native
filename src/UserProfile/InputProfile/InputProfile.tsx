import React, { useEffect, useState } from 'react';
import { Controller, useForm } from "react-hook-form";
import { View, Image, Text, TouchableOpacity, Platform, Modal } from 'react-native';
import ImagePicker, { launchCamera, launchImageLibrary, ImagePickerResponse } from 'react-native-image-picker';
import { yupResolver } from "@hookform/resolvers/yup";

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { changeAvatar, changeUserinfo, getAvatar } from '../../api/user.api/user.api';
import { setAvatar, setUser } from '../../store/slices/userSlice';
import Input from '../../Input/Input';
import Button from '../../Button/Button';
import InputProfileStyles from './InputProfileStyles';
import { toastic } from '../../utils/utils';
import { changeUserInfoSchema } from '../../utils/shemas';


const InputProfile = () => {
  const dispatch = useAppDispatch();
  const [showInputChange, setShowInputChange] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [photo, setPhoto] = useState<ImagePickerResponse>();

  const user = useAppSelector(state => state.user.user);
  const userName = useAppSelector(state => state.user.user.username);
  const userAvatar = useAppSelector(state => state.user.userAvatar.avatar);

  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(changeUserInfoSchema),
  });


  const fetchAvatar = async () => {
    try {
      const responce = await getAvatar();
      dispatch(setAvatar(responce.data.avatar));
    }
    catch (er) {
      const errorText = Object.values(er.response.data)[0];
      toastic( errorText)
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

  const onChangeUserInfo = async (value: { email: string, username?: string, }) => {
    try {
      const response = await changeUserinfo({ email: value.email, username: value.username });
      dispatch(setUser(response.data));

      setShowModal(true);
      setTimeout(() => {
        setShowModal(false);
        setShowInputChange(false);
      }, 2000);
    }
    catch (er) {
      const errorText = Object.values(er.response.data)[0];
      toastic( errorText);
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
  }

  const handleOpenCamera = async () => {
    const options: ImagePicker.CameraOptions = {
      mediaType: 'photo',
    };
    try {
      const response = await launchCamera(options);
      if (response.didCancel) {
        console.log('User cancelled image selection from the camera');
      } else if (!response.errorCode) {
        setPhoto(response);
      }
    } catch (er) {
      console.log('error', er);
    }
  }

  const handleUploadPhoto = async () => {
    const imageFormData = createFormData(photo!);
    try {
      const response = await changeAvatar(imageFormData);
      dispatch(setAvatar(response.data.avatar));
    }
    catch (er) {
      const errorText = Object.values(er.response.data)[0];
      toastic( errorText);
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
          <Image style={InputProfileStyles.user_photo} source={{ uri: `${userAvatar}` }} />
        ) : (
          <View>
            {photo ? (
              <Image style={InputProfileStyles.user_photo} source={{ uri: `${photo.assets?.[0].uri}` }} />
            ) : (
              <Image style={InputProfileStyles.user_avatar_icon} source={require('../../../images/icons/user_profile.png')} />
            )}
          </View>
        )}
        <View style={InputProfileStyles.change_photo_button}>
          <TouchableOpacity
            style={InputProfileStyles.camera_button}
            onPress={handleOpenGallery}>
            <Image source={require('../../../images/icons/camera.png')} />
          </TouchableOpacity>
          <TouchableOpacity
            style={InputProfileStyles.camera_button}
            onPress={handleOpenCamera}>
            <Image source={require('../../../images/icons/gallery.png')} />
          </TouchableOpacity>
        </View>
      </View>
      <Text style={InputProfileStyles.title}>Personal information</Text>
      <View style={InputProfileStyles.buttons_container}>
        <TouchableOpacity onPress={handlePress}>
          <Text style={InputProfileStyles.change_text}>Change information</Text>
        </TouchableOpacity>
        {showInputChange &&
          <TouchableOpacity onPress={handleClose}>
            <Text style={InputProfileStyles.change_text}>Close </Text>
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
              placeholderTextColor='#344966'
              style={InputProfileStyles.input}
              editable={showInputChange}
            />
            <Text style={InputProfileStyles.input_description}>Your name</Text>
          </View>
        )}
        name="username"
      />
      {errors.username && <Text style={InputProfileStyles.error}>{errors.username.message}</Text>}

      <Controller
        control={control}
        rules={{ required: true, }}
        render={({ field: { onChange, value } }) => (
          <View>
            <Input
              image_source={require('../../../images/icons/mail.png')}
              onChangeText={onChange}
              defaultValue={showInputChange ? value : user.email}
              placeholder={user.email}
              placeholderTextColor='#344966'
              style={InputProfileStyles.input}
              editable={showInputChange}
            />
            <Text style={InputProfileStyles.input_description}>Your email</Text>
          </View>

        )}
        name="email"
      />
      {errors.email && <Text style={InputProfileStyles.error}>{errors.email.message}</Text>}

      {showInputChange &&
        <>
          <Button
            style={InputProfileStyles.button_confirm} text={'Confirm'}
            onPress={handleSubmit(onChangeUserInfo)}
          />
          <Modal visible={showModal} transparent>
            <View style={InputProfileStyles.modal_container}>
              <View style={InputProfileStyles.modal_text}>
                <Text>Personal information was successfully changed!</Text>
              </View>
            </View>
          </Modal>
        </>
      }
    </View>

  );
};

export default InputProfile;
