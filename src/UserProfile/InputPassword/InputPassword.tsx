import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { useAppDispatch } from '../../store/hooks';
import { userPasswordChange } from '../../api/user.api/user.api';
import { setNewPassword } from '../../store/slices/userSlice';
import Input from '../../Input/Input';
import Button from '../../Button/Button';
import InputPasswordStyles from './InputPasswordStyles';
import { toastic } from '../../utils/utils';
import { changePasswordSchema } from '../../utils/shemas';

type UserLoginType = {
  password: string;
  new_password: string;
  confirm_password: string;
};

type Props = {
  text: UserLoginType;
};

const InputPassword: React.FC<Props> = props => {
  const dispatch = useAppDispatch();
  const [showInputChange, setShowInputChange] = useState(false);
  
  const { control, handleSubmit, formState: { errors } } = useForm<UserLoginType>({ resolver: yupResolver(changePasswordSchema), });

  const handlePress = () => {
    setShowInputChange(true);
  };

  const onSubmit = async (text: UserLoginType) => {
  console.log('text!!!!!!', text)
    try {
      const response = await userPasswordChange(text);
      console.log(response.data, 'response')
      dispatch(setNewPassword(response.data));
      // toastic("Password was successfully changed!");
    }
    catch (er) {
      const errorText = Object.values(er.response.data)[0];
      toastic(errorText)
    }
  };

  return (
    <View>
      <View style={InputPasswordStyles.password_group}>
        <Text style={{ fontSize: 14 }}>Password</Text>
        
        <TouchableOpacity onPress={handlePress}>
          <Text style={InputPasswordStyles.change_text}>Change password</Text>
        </TouchableOpacity>
      </View>
      <Controller
        control={control}
        rules={{required: true, }}
        render={({ field: { onChange, value } }) => (
          <View>
            <Input
              image_source={require('../../../images/icons/hide.png')}
              onChangeText={onChange}
              defaultValue={value}
              placeholder='**********'
              placeholderTextColor='#344966'
              secureTextEntry
              style={InputPasswordStyles.input}
              editable={showInputChange}
            />
            {!showInputChange ? (
              <Text style={InputPasswordStyles.input_description}>Your password</Text>
            ) : (
              <Text style={InputPasswordStyles.input_description}>Old password</Text>
            )}
          </View>
        )}
        name="password"
      />
      {errors.password && <Text style={{ color: 'red' }}>{errors.password.message}</Text>}

      {showInputChange &&
        <>
          <Controller
            control={control}
            rules={{required: true, }}
            render={({ field: { onChange, value } }) => (
              <Input
                image_source={require('../../../images/icons/hide.png')}
                onChangeText={onChange}
                defaultValue={value}
                placeholder="New password"
                placeholderTextColor='#344966'
                secureTextEntry
                style={InputPasswordStyles.input}
                editable={showInputChange}
              />
            )}
            name="new_password"
          />
          {errors.new_password && <Text style={{ color: 'red' }}>{errors.new_password.message}</Text>}

          <Text style={{ fontSize: 14, marginVertical: 10, }}>Enter your password</Text>
          <Controller
            control={control}
            rules={{ maxLength: 15, }}
            render={({ field: { onChange, value } }) => (
              <Input
                image_source={require('../../../images/icons/hide.png')}
                onChangeText={onChange}
                defaultValue={value}
                placeholder='Password replay'
                placeholderTextColor='#344966'
                secureTextEntry
                style={InputPasswordStyles.input}
                editable={showInputChange}
              />
            )}
            name="confirm_password"
          />
          {errors.confirm_password && <Text style={{ color: 'red' }}>{errors.confirm_password.message}</Text>}

          <Text style={{ fontSize: 14, marginVertical: 10, }}>Repeat your password without errors</Text>
          <Button style={InputPasswordStyles.button_confirm} text={'Confirm'}
            onPress={handleSubmit(onSubmit)} />
        </>
      }
    </View>
  );
};

export default InputPassword;

