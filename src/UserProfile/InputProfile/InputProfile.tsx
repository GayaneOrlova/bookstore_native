import React, { useEffect, useState } from 'react';
import { Controller, useForm } from "react-hook-form";
import { View, Image, Text, TouchableOpacity } from 'react-native';
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import ImagePicker from 'react-native-image-picker';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { changeProfile, userProfile } from '../../api/user.api/user.api';
import { setUserProfile } from '../../store/slices/userSlice';
import Input from '../../Input/Input';
import Button from '../../Button/Button';
import InputProfileStyles from './InputProfileStyles';
import UserButton from '../../UserButton/UserButton';

import {launchCamera, launchImageLibrary} from 'react-native-image-picker';


// type Type = {
//   password: string;
//   new_password: string;
//   confirm_password: string;
// };

const InputProfile = () => {
  const dispatch = useAppDispatch();
  const [showInputChange, setShowInputChange] = useState(false);
  const user = useAppSelector(state => state.user.user);
  const userName = useAppSelector(state => state.user.userProfile.bio);
  const userAvatar = useAppSelector(state => state.user.userProfile.avatar);

  const handlePress = () => {
    setShowInputChange(true);
  };

  const handleClose = () => {
    setShowInputChange(false);
  };

  const schema = yup.object().shape({
    bio: yup.string().required('Username is required'),
    email: yup.string().email().notRequired(),
  });

  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const fetchUserProfile = async () => {
    try {
      const responce = await userProfile();
      dispatch(setUserProfile(responce.data));
    }
    catch (er) {
      console.log(er);
    }
  }

  const onSubmit = async (value:{
    email?: yup.Maybe<string | undefined>;
    bio: string;
}) => {
    try {
      const response = await changeProfile({bio: value.bio});
      dispatch(setUserProfile(response.data));
    }
    catch (er) {
      console.log(er);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);


  const handleImagePicker = async () => {
    try {
      const options: ImagePicker.ImageLibraryOptions = {
        mediaType: 'photo',
      };
      const result = await launchImageLibrary(options);
      console.log(result)
    }
    catch(er) {
    console.log('error', er);
    }
  }


  // const handleImagePicker = () => {
  //   const options = {
  //     title: 'Select Image',
  //     storageOptions: {
  //       skipBackup: true,
  //       path: 'images',
  //     },
  //   };
  
  //   ImagePicker.launchImageLibrary(options, (response) => {
  //   });
  // };
//   const [photo, setPhoto] = useState(null);
  
//   const handleImagePicker = () => {
//   // ImagePicker.launchImageLibrary(
//   //   {
//   //    mediaType: 'photo',
//   //    includeBase64: false,
//   //    maxHeight: 200,
//   //    maxWidth: 200,
//   //   },
//   //    response => {
//   //       console.log(response);
//   //       // setPhoto(response);
//   //      },
//   //    )
//   launchImageLibrary( { mediaType: "photo", includeBase64: false, maxHeight: 200, maxWidth: 200, quality: 1, }, (response) => { if (!response.didCancel) { setPhoto(response.uri); } } );
// }

// const [photo, setPhoto] = useState(null);
  
//   const handleImagePicker = () => {
//     ImagePicker.launchImageLibrary(
//       {
//         mediaType: 'photo',
//         includeBase64: false,
//         maxHeight: 200,
//         maxWidth: 200,
//       },
//       response => {
//         if (response.didCancel) {
//           console.log('Отменено пользователем');
//         } else if (response.errorMessage) {
//           console.log('Ошибка: ', response.errorMessage);
//         } else {
//           setPhoto(response);
//         }
//       }
//     );
//   }



  return (
    <View>
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
      <TouchableOpacity
        style={InputProfileStyles.camera_button}
        onPress={handleImagePicker}>
        <Image source={require('../../../images/icons/camera.png')} />
      </TouchableOpacity>
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
        name="bio"
      />
      {errors.bio && <Text style={{ color: 'red' }}>{errors.bio.message}</Text>}

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