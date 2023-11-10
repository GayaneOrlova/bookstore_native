import React from 'react';
import {Text, TouchableOpacity, ViewStyle} from 'react-native';

import buttonStyles from './ButtonStyles';
import { useAppSelector } from '../../store/hooks';
import { BookType } from '../../store/slices/bookSlice';

type Props = {
  text: string;
  style?: ViewStyle;
  item?: BookType;
  onPress?: (value: any) => void;
};

const Button: React.FC<Props> = props => {
  const isUser = useAppSelector(state => state.user.user);
  const isBookOnCart = isUser.cart_items_books.includes(props.item!.id);

  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={{...buttonStyles.button, ...props.style}}>
      <Text style={isBookOnCart ? buttonStyles.button_on_cart : buttonStyles.text_button}>{props.text}</Text>
    </TouchableOpacity>
  );
};

export default Button;
