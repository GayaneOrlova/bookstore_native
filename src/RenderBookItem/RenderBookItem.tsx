import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { Rating } from '@kolking/react-native-rating';
import { BookType } from '../store/slices/bookSlice';
import Button from '../Button/Button';
import RenderBookItemStyles from './RenderBookItemStyles';
import FavoriteIcon from '../FavoriteIcon/FavoriteIcon';
import { useAppSelector } from '../store/hooks';
import { changeFavoriteById } from '../api/book.api';

type Props = {
  item: BookType;
  navigation: any;
};

const RenderBookItem: React.FC<Props> = ({ item, navigation }) => {
  const onBookDetailPage = (id: number) => {
    navigation.navigate('BookDetail', { id });
  };

  const onCartClick = () => {
    console.log('New rating:');
  };

  
  return (
    <TouchableOpacity onPress={() => onBookDetailPage(item.id)}>
      <View style={RenderBookItemStyles.book_container}>
        <View style={RenderBookItemStyles.book_image_container}>
          <FavoriteIcon id={item.id} like={item.like}/>
          {item.bestseller && <Button style={RenderBookItemStyles.bestseller_flag} text={'Bestseller'}/>}
          {item.new && <Button style={RenderBookItemStyles.new_flag} text={'New'}/>}
          <Image style={RenderBookItemStyles.book_image} source={{ uri: item.image }} />
        </View>
        <Text style={RenderBookItemStyles.book_title}>{item.title}</Text>
        <Text style={RenderBookItemStyles.book_author}>{item.author}</Text>
        <View style={RenderBookItemStyles.rating_container}>
          <Rating size={20} rating={item.overall_rating} fillColor={'#BFCC94'} />
          <Text style={RenderBookItemStyles.rating_text}>{(item.overall_rating.toFixed(1))}</Text>
        </View>
        <Button style={item.available ? RenderBookItemStyles.price_button : RenderBookItemStyles.available_button} text={item.available ? `$${item.price} USD` : 'Not available'} onPress={onCartClick} />
      </View>
    </TouchableOpacity>
  );
};

export default RenderBookItem;
