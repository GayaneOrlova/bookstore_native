import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { useAppDispatch } from '../../../store/hooks';
import { userPasswordChange } from '../../../api/user.api/user.api';
import { setNewPassword } from '../../../store/slices/userSlice';

import Button from '../../Button/Button';
import UserPasswordController from '../UserPasswordController/UserPasswordController';
import userPasswordChangeStyles from './UserPasswordChangeStyles';

import { toast } from '../../../utils/utils';
import { changePasswordSchema } from '../../../utils/shemas';

type UserLoginType = {
  password: string;
  new_password: string;
  confirm_password: string;
};

type Props = {
};

const UserPasswordChange: React.FC<Props> = () => {
  const dispatch = useAppDispatch();
  const [showInputChange, setShowInputChange] = useState(false);
  const { control, handleSubmit, formState: { errors } } = useForm<UserLoginType>({ resolver: yupResolver(changePasswordSchema), });

  const handlePress = () => {
    setShowInputChange(true);
  };

  const onSubmit = async (text: UserLoginType) => {
    console.log(text, 'text')
    try {
      const response = await userPasswordChange(text);
      dispatch(setNewPassword(response.data));
      toast("Password was successfully changed!");
    }
    catch (err: any) {
      const errorText = Object.values(err.response.data)[0];
      toast(errorText)
    }
  };

  return (
    <View>
      <View style={userPasswordChangeStyles.password_group}>
        <Text style={{ fontSize: 14 }}>Password</Text>
        <TouchableOpacity onPress={handlePress}>
          <Text style={userPasswordChangeStyles.change_text}>Change password</Text>
        </TouchableOpacity>
      </View>
      <UserPasswordController placeholder={'****************'} showInputChange={showInputChange} control={control} name={'password'} />
      {errors.password && <Text style={userPasswordChangeStyles.error}>{errors.password.message}</Text>}

      {showInputChange &&
        <>
          <UserPasswordController placeholder={'New password'} showInputChange={showInputChange} control={control} name={'new_password'} />
          {errors.new_password && <Text style={userPasswordChangeStyles.error}>{errors.new_password.message}</Text>}
          <Text style={userPasswordChangeStyles.input_text}>Enter your password</Text>

          <UserPasswordController placeholder={'Password replay'} showInputChange={showInputChange} control={control} name={'confirm_password'} />
          {errors.confirm_password && <Text style={userPasswordChangeStyles.error}>{errors.confirm_password.message}</Text>}
          <Text style={userPasswordChangeStyles.input_text}>Repeat your password without errors</Text>
          
          <Button style={userPasswordChangeStyles.button_confirm} text={'Confirm'}
            onPress={handleSubmit(onSubmit)} />
        </>
      }
    </View>
  );
};

export default UserPasswordChange;

