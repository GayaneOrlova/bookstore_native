import React, { useEffect, useState } from 'react';
import { Controller, useForm } from "react-hook-form";
import { View, Text, TouchableOpacity } from 'react-native';
import { yupResolver } from "@hookform/resolvers/yup";

import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { changeUserinfo, getAvatar } from '../../../api/user.api/user.api';
import { setAvatar, setUsername } from '../../../store/slices/userSlice';

import Input from '../../Input/Input';
import Button from '../../Button/Button';
import UserAvatar from './UserAvatar/UserAvatar';
import userPersonalInfoStyles from './UserPersonalInfoStyles';

import { toast } from '../../../utils/utils';
import { changeUserInfoSchema } from '../../../utils/shemas';
import { COLORS } from '../../../utils/colors';

type Props = {}

const UserPersonalInfo: React.FC<Props> = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.user.user);
  const userName = useAppSelector(state => state.user.user.username);
  const [showInputChange, setShowInputChange] = useState(false);
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(changeUserInfoSchema),
  });

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

  return (
    <View>
      <UserAvatar />
      <Text style={userPersonalInfoStyles.title}>Personal information</Text>
      <View style={userPersonalInfoStyles.buttons_container}>
        <TouchableOpacity onPress={handlePress}>
          <Text style={userPersonalInfoStyles.change_text}>Change information</Text>
        </TouchableOpacity>
        {showInputChange &&
          <TouchableOpacity onPress={handleClose}>
            <Text style={userPersonalInfoStyles.change_text}>Close </Text>
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
              style={userPersonalInfoStyles.input}
              editable={showInputChange}
            />
            <Text style={userPersonalInfoStyles.input_description}>Your name</Text>
          </View>
        )}
        name="username"
      />
      {errors.username && showInputChange && <Text style={userPersonalInfoStyles.error}>{errors.username.message}</Text>}
      <View>
        <Input
          image_source={require('../../../images/icons/mail.png')}
          value={user.email}
          placeholder={user.email}
          placeholderTextColor={COLORS.dark_blue}
          style={userPersonalInfoStyles.input}
          editable={showInputChange}
          defaultValue={''}
        />
        <Text style={userPersonalInfoStyles.input_description}>Your email</Text>
      </View>
      {showInputChange &&
        <Button
          style={userPersonalInfoStyles.button_confirm} text={'Confirm'}
          onPress={handleSubmit(onChangeUserInfo)}
        />
      }
    </View>

  );
};

export default UserPersonalInfo;
