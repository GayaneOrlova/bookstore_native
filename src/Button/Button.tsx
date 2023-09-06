import React from 'react';
import {Text, TouchableOpacity, ViewStyle} from 'react-native';
import ButtonStyles from './ButtonStyles';

type Props = {
  text: string;
  style?: ViewStyle;
  onPress?: (value: any) => void;
};

const Button: React.FC<Props> = props => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={{...ButtonStyles.button, ...props.style}}>
      <Text style={ButtonStyles.text_button}>{props.text}</Text>
    </TouchableOpacity>
  );
};

export default Button;
