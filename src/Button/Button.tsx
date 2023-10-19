import React from 'react';
import {Text, TouchableOpacity, ViewStyle} from 'react-native';

import buttonStyles from './ButtonStyles';

type Props = {
  text: string;
  style?: ViewStyle;
  onPress?: (value: any) => void;
};

const Button: React.FC<Props> = props => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={{...buttonStyles.button, ...props.style}}>
      <Text style={buttonStyles.text_button}>{props.text}</Text>
    </TouchableOpacity>
  );
};

export default Button;
