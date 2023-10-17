import React, { useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { Rating } from '@kolking/react-native-rating';
import { BookType, changeCartItem } from '../store/slices/bookSlice';
import Button from '../Button/Button';
import RenderBookItemStyles from './RenderBookItemStyles';
import FavoriteIcon from '../FavoriteIcon/FavoriteIcon';
import { toastic } from '../utils/utils';
import { createCartItem } from '../api/book.api';
import { useAppDispatch } from '../store/hooks';

type Props = {
  item: BookType;
  navigation: any;
  onFavoritePress: () => void;
};

const RenderBookItem: React.FC<Props> = (props) => {
const dispatch = useAppDispatch();
  const onBookDetailPage = (id: number) => {
    props.navigation.navigate('BookDetail', { id });
  };
  
  const onClickToCart = async () => {
    try {
      const response = await createCartItem(props.item.id);
      dispatch(changeCartItem(response.data))
      toastic('Book was successfully added!')
    } catch (er) {
      const errorText = Object.values(er.response.data)[0];
      toastic( errorText)
    }
  };

  return (
    <TouchableOpacity onPress={() => onBookDetailPage(props.item.id)}>
      <View style={RenderBookItemStyles.book_container}>
        <View style={RenderBookItemStyles.book_image_container}>
          <FavoriteIcon id={props.item.id} like={props.item.like} onFavoritePress={props.onFavoritePress}/>
          {props.item.bestseller && <Button style={RenderBookItemStyles.bestseller_flag} text={'Bestseller'} />}
          {props.item.new && <Button style={RenderBookItemStyles.new_flag} text={'New'} />}
          <Image style={RenderBookItemStyles.book_image} source={{ uri: props.item.image }} />
        </View>
        <Text style={RenderBookItemStyles.book_title}>{props.item.title}</Text>
        <Text style={RenderBookItemStyles.book_author}>{props.item.author}</Text>
        <View style={RenderBookItemStyles.rating_container}>
          <Rating size={20} rating={props.item.overall_rating} fillColor={'#BFCC94'} />
          <Text style={RenderBookItemStyles.rating_text}>{props.item.overall_rating}</Text>
        </View>
        <Button style={props.item.available ? RenderBookItemStyles.price_button : RenderBookItemStyles.available_button} text={props.item.available ? `$${props.item.price} USD` : 'Not available'} onPress={onClickToCart} />
      </View>
    </TouchableOpacity>
  );
};

export default RenderBookItem;
