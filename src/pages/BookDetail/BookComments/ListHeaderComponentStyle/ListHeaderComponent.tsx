import React, { } from 'react';
import { View, Image, Text } from 'react-native';
import { Rating } from '@kolking/react-native-rating';

import { useAppSelector } from '../../../../store/hooks';
import { BookType } from '../../../../store/slices/bookSlice';

import Header from '../../../Header/Header';
import Button from '../../../Button/Button';
import listHeaderComponentStyle from './ListHeaderComponentStyle';

import { COLORS } from '../../../../utils/colors';

type Props = {
  bookDetail: BookType;
  userNewRating: number;
  addBookRating: (rating: number) => Promise<void>;
  onClickToCart: () => void;
};

const ListHeaderComponent: React.FC<Props> = (props) => {
  const isUser = useAppSelector(state => state.user.user);

  return (
    <View>
      <Header />
      <View style={listHeaderComponentStyle.container}>
        <View style={listHeaderComponentStyle.book_info}>
          <Image style={listHeaderComponentStyle.book_image} source={{ uri: props.bookDetail.image }} />
          <View style={listHeaderComponentStyle.book_detail}>
            <Text style={listHeaderComponentStyle.title_text}>{props.bookDetail.title}</Text>
            <Text style={listHeaderComponentStyle.text_author}>{props.bookDetail.author}</Text>
            <View style={listHeaderComponentStyle.book_info}>
              <Image style={listHeaderComponentStyle.rate_image} source={require('../../../../images/icons/star.png')} />
              <Text style={listHeaderComponentStyle.text}>{(props.bookDetail?.overall_rating).toFixed(1)}</Text>
            </View>
            {isUser.email && props.bookDetail.rating &&
              <View style={listHeaderComponentStyle.book_info}>
                <Text>Your rate of this book: </Text>
                <Text style={listHeaderComponentStyle.rate_text}>{(props.bookDetail.overall_rating).toFixed(1)}</Text>
              </View>
            }
            {isUser.email && !props.bookDetail.rating &&
              <View>
                <Rating onChange={props.addBookRating} maxRating={5} size={20} rating={props.userNewRating} fillColor={COLORS.green} />
                <Text style={listHeaderComponentStyle.text}>Rate this book</Text>
              </View>
            }
          </View>
        </View>
        <Text style={listHeaderComponentStyle.description_text}>Description</Text>
        <Text style={listHeaderComponentStyle.book_body}>{props.bookDetail.body}</Text>
        <Button style={props.bookDetail.available ? listHeaderComponentStyle.price_button : listHeaderComponentStyle.available_button} text={props.bookDetail.available ? `$${props.bookDetail.price} USD` : 'Not available'} onPress={props.onClickToCart} />
      </View>
    </View>
  );
};

export default ListHeaderComponent;


