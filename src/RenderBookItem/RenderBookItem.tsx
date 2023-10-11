import React, { useState } from 'react';
import { Image, Modal, Text, TouchableOpacity, View } from 'react-native';
import { Rating } from '@kolking/react-native-rating';
import { BookType } from '../store/slices/bookSlice';
import Button from '../Button/Button';
import RenderBookItemStyles from './RenderBookItemStyles';
import FavoriteIcon from '../FavoriteIcon/FavoriteIcon';
import CartStyles from '../Cart/CartStyles';
import { createCartItem } from '../api/book.api';
import { toastic } from '../utils/utils';

type Props = {
  item: BookType;
  navigation: any;
};

const RenderBookItem: React.FC<Props> = ({ item, navigation }) => {
  const [showModal, setShowModal] = useState(false);
  const overall_rating = (item.overall_rating.toFixed(1))
  const onBookDetailPage = (id: number) => {
    navigation.navigate('BookDetail', { id });
  };

  const onClickToCart = async () => {
    try {
      const response = await createCartItem(item.id);
      toastic('Book was successfully added!')
      // setBookDetail(response.data);
    } catch (er) {
      const errorText = Object.values(er.response.data)[0];
      toastic( errorText)
    }
  };

  return (
    <TouchableOpacity onPress={() => onBookDetailPage(item.id)}>
      <View style={RenderBookItemStyles.book_container}>
        <View style={RenderBookItemStyles.book_image_container}>
          <FavoriteIcon id={item.id} like={item.like} />
          {item.bestseller && <Button style={RenderBookItemStyles.bestseller_flag} text={'Bestseller'} />}
          {item.new && <Button style={RenderBookItemStyles.new_flag} text={'New'} />}
          <Image style={RenderBookItemStyles.book_image} source={{ uri: item.image }} />
        </View>
        <Text style={RenderBookItemStyles.book_title}>{item.title}</Text>
        <Text style={RenderBookItemStyles.book_author}>{item.author}</Text>
        <View style={RenderBookItemStyles.rating_container}>
          <Rating size={20} rating={item.overall_rating} fillColor={'#BFCC94'} />
          <Text style={RenderBookItemStyles.rating_text}>{overall_rating}</Text>
        </View>
        <Button style={item.available ? RenderBookItemStyles.price_button : RenderBookItemStyles.available_button} text={item.available ? `$${item.price} USD` : 'Not available'} onPress={onClickToCart} />
        {/* <Modal visible={showModal} transparent>
          <View style={CartStyles.modal}>
            <View style={CartStyles.modal_text}>
              <Text>Successfully added!</Text>
            </View>
          </View>
        </Modal> */}
      </View>
    </TouchableOpacity>
  );
};

export default RenderBookItem;
