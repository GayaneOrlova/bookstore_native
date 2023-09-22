import React, { useEffect, useState } from 'react';
import { Controller, useForm } from "react-hook-form";
import { View, Image, Text, TouchableOpacity, Platform, Modal } from 'react-native';
import ImagePicker, { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { changeAvatar, changeUserinfo, getAvatar } from '../../api/user.api/user.api';
import { setAvatar, setUser } from '../../store/slices/userSlice';
import Input from '../../Input/Input';
import Button from '../../Button/Button';
import InputProfileStyles from './InputProfileStyles';

type ImagePickerResponse = {
  assets: Array<{
    fileName: string;
    type: string;
    uri: string;
  }>;
  didCancel: boolean;
};

const InputProfile = () => {
  const dispatch = useAppDispatch();
  const [showInputChange, setShowInputChange] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [photo, setPhoto] = useState<ImagePicker.ImagePickerResponse>();

  const user = useAppSelector(state => state.user.user);
  const userName = useAppSelector(state => state.user.user.username);
  const userAvatar = useAppSelector(state => state.user.userAvatar);

  const schema = yup.object().shape({
    username: yup.string().required('Username is required'),
    email: yup.string().required('Username is required'),
  });
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });


  const fetchAvatar = async () => {
    try {
      const responce = await getAvatar();
      dispatch(setAvatar(responce.data.avatar));
    }
    catch (er) {
      console.log(er);
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
        setShowInputChange(false)
      }, 2000);
    }
    catch (er) {
      console.log(er);
    }
  };

  const createFormData = (photo: ImagePickerResponse, body = {}) => {
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
    if (!response.didCancel) {
      setPhoto(response);
    }
  }

  const handleOpenCamera = async () => {
    const options: ImagePicker.CameraOptions = {
      mediaType: 'photo',
    };
    const response = await launchCamera(options);
    console.log('response', response)
    if (!response.didCancel) {
      setPhoto(response);
    }
  }

  const handleUploadPhoto = async () => {
    const imageFormData = createFormData(photo);
    try {
      const response = await changeAvatar(imageFormData);
      dispatch(setAvatar(response.data.avatar));
    }
    catch (er) {
      console.log(er, 'dfghjkl;');
    }
  };

  useEffect(() => {
    handleUploadPhoto();
  }, [photo]);

  return (
    <View>
      <View>
        {userAvatar && !photo ? (
          <Image style={InputProfileStyles.user_photo} source={{ uri: `${userAvatar}` }} />
        ) :
          <View>
            {photo ? (
              <Image style={InputProfileStyles.user_photo} source={{ uri: `${photo.assets[0].uri}` }} />
            ) : (
              <Image style={InputProfileStyles.user_avatar_icon} source={require('../../../images/icons/user_profile.png')} />
            )}
          </View>
        }
        <View style={{
          flexDirection: 'row', justifyContent: 'space-around', position: 'absolute',
          right: 10,
          bottom: 60,
        }}>
          <TouchableOpacity
            style={InputProfileStyles.camera_button}
            onPress={handleImagePicker}>
            <Image source={require('../../../images/icons/camera.png')} />
          </TouchableOpacity>
          <TouchableOpacity
            style={InputProfileStyles.camera_button}
            onPress={handleOpenCamera}>
            <Image source={require('../../../images/icons/camera.png')} />
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
      {errors.username && <Text style={{ color: 'red' }}>{errors.username.message}</Text>}

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
      {errors.email && <Text style={{ color: 'red' }}>{errors.email.message}</Text>}

      {showInputChange &&
        <>
          <Button
            style={InputProfileStyles.button_confirm} text={'Confirm'}
            onPress={handleSubmit(onChangeUserInfo)}
          />
          <Modal visible={showModal} transparent>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
              <View style={{ backgroundColor: 'white', padding: 20 }}>
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
