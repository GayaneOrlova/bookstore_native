import React, { useEffect, useState } from 'react';
import { View, Image, TouchableOpacity, Platform } from 'react-native';
import ImagePicker, { launchImageLibrary, ImagePickerResponse } from 'react-native-image-picker';

import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { changeAvatar, getAvatar } from '../../../../api/user.api/user.api';
import { setAvatar } from '../../../../store/slices/userSlice';

import userAvatarStyles from './UserAvatarStyles';

import { toast } from '../../../../utils/utils';

type Props = {}

const UserAvatar: React.FC<Props> = () => {
  const dispatch = useAppDispatch();
  const userAvatar = useAppSelector(state => state.user.userAvatar.avatar);
  const [photo, setPhoto] = useState<ImagePickerResponse>();

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
        {userAvatar && !photo ? (
          <Image style={userAvatarStyles.user_photo} source={{ uri: `${userAvatar}` }} />
        ) : (
          <View>
            {photo ? (
              <Image style={userAvatarStyles.user_photo} source={{ uri: `${photo.assets?.[0].uri}` }} />
            ) : (
              <Image style={userAvatarStyles.user_avatar_icon} source={require('../../../../images/icons/user_profile.png')} />
            )}
          </View>
        )}
        <View style={userAvatarStyles.change_photo_button}>
          <TouchableOpacity
            style={userAvatarStyles.camera_button}
            onPress={handleOpenGallery}>
            <Image source={require('../../../../images/icons/camera.png')} />
          </TouchableOpacity>
        </View>
      </View>
  );
};

export default UserAvatar;
