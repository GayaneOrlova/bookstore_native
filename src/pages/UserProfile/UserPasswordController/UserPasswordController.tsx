import React from 'react';
import { View, Text } from 'react-native';
import { Control, Controller } from "react-hook-form";

import Input from '../../Input/Input';
import userPasswordControllerStyles from './UserPasswordControllerStyles';

import { COLORS } from '../../../utils/colors';

type UserLoginType = {
  password: string;
  new_password: string;
  confirm_password: string;
};

type Props = {
  placeholder: string,
  showInputChange: boolean,
  control: Control<UserLoginType, any>,
  name: "password" | "new_password" | "confirm_password",
};

const UserPasswordController: React.FC<Props> = (props) => {

  return (
    <Controller
      control={props.control}
      rules={{ required: true, }}
      render={({ field: { onChange, value } }) => (
        <View>
          <Input
            image_source={require('../../../images/icons/hide.png')}
            onChangeText={onChange}
            defaultValue={value}
            placeholder={props.placeholder}
            placeholderTextColor={COLORS.dark_blue}
            secureTextEntry
            style={userPasswordControllerStyles.input}
            editable={props.showInputChange}
          />
          <Text style={userPasswordControllerStyles.input_description}>Your password</Text>
        </View>
      )}
      name={props.name}
    />
  );
};

export default UserPasswordController;

