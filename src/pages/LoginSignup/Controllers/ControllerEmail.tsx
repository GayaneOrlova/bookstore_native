import React from 'react';
import { Control, Controller, FieldErrors } from "react-hook-form";
import { View, Text } from 'react-native';


import Input from '../../Input/Input';

import { COLORS } from '../../../utils/colors';
import controllersStyles from './ControllersStyles';

type Props = {
  control: Control<{
    email: string;
    password: string;
    confirm_password?: string;
  }>,
  errors: FieldErrors<{
    email: string;
    password: string;
    confirm_password: string;
  }>
}

const ControllerEmail: React.FC<Props> = (props) => {

  return (
    <Controller
      control={props.control}
      rules={{ required: true, }}
      render={({ field: { onChange, value } }) => (
        <View style={controllersStyles.input_group}>
          <Input
            image_source={require('../../../images/icons/mail.png')}
            onChangeText={onChange}
            defaultValue={value}
            placeholder='Email'
            placeholderTextColor={COLORS.dark_grey}
          />
          {props.errors.email ? (<Text style={controllersStyles.error}>{props.errors.email.message}</Text>) : (
            <Text style={controllersStyles.input_description}>Enter your email</Text>)
          }
        </View>
      )}
      name="email"
    />
  );
};

export default ControllerEmail;