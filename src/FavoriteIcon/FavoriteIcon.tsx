import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import RenderBookItemStyles from './FavoriteIconStyles';
import { BookType, changeBookLike } from '../store/slices/bookSlice';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../BookComments/BookComments';
import { changeFavoriteById } from '../api/book.api';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { Text } from 'react-native-svg';
import { toastic } from '../utils/utils';


type Props = {
  id: number;
  like: boolean;
}

const FavoriteIcon: React.FC<Props> = (props) => {
  const dispatch = useAppDispatch();


  const onLikeClick = async() => {
    try {
      const res = await changeFavoriteById(props.id);
      dispatch(changeBookLike(props.id));
    }
    catch(er){
      const errorText = Object.values(er.response.data);
      toastic( errorText)
    }
  };

  return (
      <TouchableOpacity
        style={[RenderBookItemStyles.favorite_button, props.like && RenderBookItemStyles.favorite_button_liked]}
        onPress={onLikeClick}
      >
        <FontAwesomeIcon icon={faHeart} color={'#ffffff'} />
        <Text></Text>
      </TouchableOpacity>
  );
};

export default FavoriteIcon;
