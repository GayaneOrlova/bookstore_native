import React from 'react';
import { View, Image, TextInput, ImageSourcePropType, ViewStyle } from 'react-native';
import InputStyles from './InputStyles';

type Props = {
  image_source: ImageSourcePropType;
  style?: ViewStyle;
  onChangeText: (text: string) => void;
  defaultValue: string;
  placeholder: string;
  placeholderTextColor: string;
  secureTextEntry?: boolean;
};
const Input: React.FC<Props> = props => {

  const onChange = (text: string): void => {
    props.onChangeText(text);
  }
  
  return (
    <View style={InputStyles.input_form}>
      <Image style={InputStyles.input_icon} source={props.image_source} />
      <TextInput
        // style={InputStyles.input_form}
        onChangeText={onChange}
        defaultValue={props.defaultValue}
        placeholder={props.placeholder}
        placeholderTextColor={props.placeholderTextColor}
        secureTextEntry={props.secureTextEntry}
      />
    </View>
  );
};

export default Input;
