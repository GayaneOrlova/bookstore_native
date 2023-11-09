import React from 'react';
import { Control, Controller, FieldErrors } from "react-hook-form";
import { View, Text } from 'react-native';

import Input from '../../Input/Input';
import loginStyles from './PasswordControllerStyles';

import { COLORS } from '../../../utils/colors';

type Props = {
  control: Control<{
    email: string;
    password: string;
  }>,
  errors: FieldErrors<{
    email: string;
    password: string;
  }>,
  placeholder: string,
  input_description: string,
}

const PasswordController: React.FC<Props> = (props) => {

  return (
    <Controller
      control={props.control}
      rules={{ maxLength: 15, }}
      render={({ field: { onChange, onBlur, value } }) => (
        <View style={loginStyles.input_group}>
          <Input
            image_source={require('../../../images/icons/hide.png')}
            onChangeText={onChange}
            defaultValue={value}
            placeholder={props.placeholder}
            placeholderTextColor={COLORS.dark_grey}
            secureTextEntry
            onBlur={onBlur}
          />
          {props.errors.password ? (<Text style={loginStyles.error}>{props.errors.password.message}</Text>)
            : (
              <Text style={loginStyles.input_description}>{props.input_description}</Text>
            )}
        </View>
      )}
      name="password"
    />
  );
};

export default PasswordController;