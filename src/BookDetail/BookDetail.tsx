import React, { useEffect, useState } from 'react';
import { View, Image, Text } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Rating } from '@kolking/react-native-rating';
import { StackNavigationProp } from '@react-navigation/stack';
import { ScrollView } from 'react-native-gesture-handler';

import { useAppDispatch, useAppSelector } from '../store/hooks';
import { BookType, changeCartItem } from '../store/slices/bookSlice';
import { createBookRating, createCartItem, getBookById } from '../api/book.api';

import Header from '../Header/Header';
import Button from '../Button/Button';
import Footer from '../Footer/Footer';
import BookComments from '../BookComments/BookComments';
import renderBookItemStyles from '../RenderBookItem/RenderBookItemStyles';
import bookDetailStyle from './BookDetailStyle';

import { toast } from '../utils/utils';
import { COLORS } from '../utils/colors';

type Props = {};

type RootStackParamList = {
  BookDetail: { id: number }
};
type NavigationProps = StackNavigationProp<RootStackParamList>;

const BookDetail: React.FC<Props> = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<NavigationProps>();

  const route = useRoute();
  const id = route.params?.id;

  const isUser = useAppSelector(state => state.user.user);
  const [bookDetail, setBookDetail] = useState<BookType>();
  const [userNewRating, setUserNewRating] = useState();

  const fetchBookDetail = async () => {
    if (!id) { return; }
    try {
      const response = await getBookById(id);
      setBookDetail(response.data);
    } catch (er) {
      toast('An error occurred');
    }
  };
  useEffect(() => {
    fetchBookDetail();
  }, [userNewRating])

  const addBookRating = async (rating: number) => {
    try {
      const response = await createBookRating(id, rating);
      setUserNewRating(response.data.rating);
      toast('Rating was successfully added!');
    }
    catch (er) {
      toast('An error occurred');
    }
  };

  const onClickToCart = async () => {
    try {
      const response = await createCartItem(id);
      dispatch(changeCartItem(response.data));
      toast('Book was added to cart!')
    } catch (er) {
      toast('An error occurred');
    }
  };

  if (!bookDetail) { return null; }

  return (
    <ScrollView>
      <Header></Header>
      <View style={bookDetailStyle.container}>
        <View style={bookDetailStyle.book_info}>
          <View style={renderBookItemStyles.book_image_container}>
            <Image style={bookDetailStyle.book_image} source={{ uri: bookDetail.image }} />
          </View>
          <View style={bookDetailStyle.book_detail}>
            <Text style={bookDetailStyle.title_text}>{bookDetail.title}</Text>
            <Text style={bookDetailStyle.text_author}>{bookDetail.author}</Text>
            <View style={bookDetailStyle.book_info}>
              <Image style={bookDetailStyle.rate_image} source={require('../../images/icons/star.png')} />
              <Text style={bookDetailStyle.text}>{(bookDetail?.overall_rating).toFixed(1)}</Text>
            </View>
            {isUser.email && bookDetail.rating &&
              <View style={bookDetailStyle.book_info}>
                <Text>Your rate of this book: </Text>
                <Text style={bookDetailStyle.rate_text}>{(bookDetail.overall_rating).toFixed(1)}</Text>
              </View>
            }
            {isUser.email && !bookDetail.rating &&
              <View>
                <Rating onChange={addBookRating} maxRating={5} size={20} rating={userNewRating} fillColor={COLORS.green} />
                <Text style={bookDetailStyle.text}>Rate this book</Text>
              </View>
            }
          </View>
        </View>
        <Text style={bookDetailStyle.description_text}>Description</Text>
        <Text style={bookDetailStyle.book_body}>{bookDetail.body}</Text>
        <Button style={bookDetail.available ? bookDetailStyle.price_button : bookDetailStyle.available_button} text={bookDetail.available ? `$${bookDetail.price} USD` : 'Not available'} onPress={onClickToCart} />
        <BookComments id={bookDetail.id} commentList={bookDetail.comments} />
      </View>
      <Footer />
    </ScrollView>
  );
};

export default BookDetail;


