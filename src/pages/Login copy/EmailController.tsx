import React from 'react';
import { Control, Controller, FieldErrors } from "react-hook-form";
import { View, Text } from 'react-native';


import Input from '../Input/Input';

import { COLORS } from '../../utils/colors';
import emailController from './EmailControllerStyles';

type Props = {
  control: Control<{
    email: string;
    password: string;
  }>,
  errors: FieldErrors<{
    email: string;
    password: string;
  }>
}

const EmailController: React.FC<Props> = (props) => {

  return (
    <Controller
      control={props.control}
      rules={{ required: true, }}
      render={({ field: { onChange, value } }) => (
        <View style={emailController.input_group}>
          <Input
            image_source={require('../../images/icons/mail.png')}
            onChangeText={onChange}
            defaultValue={value}
            placeholder='Email'
            placeholderTextColor={COLORS.dark_grey}
          />
          {props.errors.email ? (<Text style={emailController.error}>{props.errors.email.message}</Text>) : (
            <Text style={emailController.input_description}>Enter your email</Text>)
          }
        </View>
      )}
      name="email"
    />
  );
};

export default EmailController;