import React from 'react';
import { Image, ImageSourcePropType, Text, TouchableOpacity, View, ViewStyle } from 'react-native';
import UserButtonStyles from './UserButtonStyles';

type Props = {
  style?: ViewStyle;
  onPress?: (value: any) => void;
  image_source: ImageSourcePropType;
  amount?: number,
};

const UserButton: React.FC<Props> = props => {
  return (
    <TouchableOpacity
      style={{ ...UserButtonStyles.button, ...props.style }}
      onPress={props.onPress}>
      <Image source={props.image_source} />
    </TouchableOpacity>
  );
};

export default UserButton;
