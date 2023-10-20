import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { Rating } from '@kolking/react-native-rating';

import { createCartItem } from '../api/book.api';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { BookType, changeCartItem } from '../store/slices/bookSlice';

import Button from '../Button/Button';
import FavoriteIcon from '../FavoriteIcon/FavoriteIcon';
import renderBookItemStyles from './RenderBookItemStyles';

import { toast } from '../utils/utils';
import { COLORS } from '../utils/colors';


type Props = {
  item: BookType;
  navigation: any;
  onFavoritePress: () => void;
};

const RenderBookItem: React.FC<Props> = (props) => {
  const dispatch = useAppDispatch();
  const isUser = useAppSelector(state => state.user.user);
  const isBookOnCart = isUser.cart_items_books?.includes(props.item?.id);

  const onBookDetailPage = (id: number) => {
    props.navigation.navigate('BookDetail', { id });
  };

  const onClickToCart = async () => {
    try {
      const response = await createCartItem(props.item.id);
      dispatch(changeCartItem(response.data))
      toast('Book was successfully added!')
    } catch (err: any) {
      const errorText = Object.values(err.response.data)[0];
      toast(errorText)
    }
  };

  return (
    <TouchableOpacity onPress={() => onBookDetailPage(props.item.id)}>
      <View style={renderBookItemStyles.book_container}>
        <View style={renderBookItemStyles.book_image_container}>
          {isUser.email && <FavoriteIcon id={props.item.id} like={props.item.like} onFavoritePress={props.onFavoritePress} />}
          {props.item.bestseller && <Button style={renderBookItemStyles.bestseller_flag} text={'Bestseller'}/>}
          {props.item.new && <Button style={renderBookItemStyles.new_flag} text={'New'} />}
          <Image style={renderBookItemStyles.book_image} source={{ uri: props.item.image }} />
        </View>
        <Text style={renderBookItemStyles.book_title}>{props.item.title}</Text>
        <Text style={renderBookItemStyles.book_author}>{props.item.author}</Text>
        <View style={renderBookItemStyles.rating_container}>
          <Rating size={20} rating={props.item.overall_rating} fillColor={COLORS.green} />
          <Text style={renderBookItemStyles.rating_text}>{props.item.overall_rating}</Text>
        </View>
        <Button
          item = {props.item}
          style={isBookOnCart ? renderBookItemStyles.button_on_cart :  props.item.available ? renderBookItemStyles.price_button : renderBookItemStyles.available_button}
          text={props.item.available ?
            (isBookOnCart ? 'Added to cart' : `$${props.item.price} USD`)
            : 'Not available'}
          onPress={onClickToCart} />
      </View>
    </TouchableOpacity>
  );
};

export default RenderBookItem;
