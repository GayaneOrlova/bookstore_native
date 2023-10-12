import React, { useEffect, useState } from 'react';
import { View, Image, Text } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Rating } from '@kolking/react-native-rating';
import { StackNavigationProp } from '@react-navigation/stack';
import { ScrollView } from 'react-native-gesture-handler';
import { useAppSelector } from '../store/hooks';
import { BookType } from '../store/slices/bookSlice';
import { createBookRating, createCartItem, getBookById, getBookRating } from '../api/book.api';
import Header from '../Header/Header';
import Button from '../Button/Button';
import Footer from '../Footer/Footer';
import BookDetailStyle from './BookDetailStyle';
import RenderBookItemStyles from '../RenderBookItem/RenderBookItemStyles';
import FavoriteIcon from '../FavoriteIcon/FavoriteIcon';
import BookComments from '../BookComments/BookComments';

import { toastic } from '../utils/utils';
import BooksRecommend from '../BooksRecommend/BooksRecommend';
type Props = {};


type RootStackParamList = {
  BookDetail: { id: number }
};
// type Props = StackScreenProps<RootStackParamList, 'BookDetail'>;

type NavigationProps = StackNavigationProp<RootStackParamList>;

const BookDetail: React.FC<Props> = () => {
  // const navigation = useNavigation();
  const navigation = useNavigation<NavigationProps>();

  const route = useRoute();
  const id = route.params?.id;
  
  // const { id } = route.params;
  const isUser = useAppSelector(state => state.user.user);  
  const [userRating, setUserRating] = useState();
  const [userNewRating, setUserNewRating] = useState();
  const [bookDetail, setBookDetail] = useState<BookType>();
  
  const fetchBookDetail = async () => {
    if (!id) { return; }
    try {
      const response = await getBookById(id);
      setBookDetail(response.data);      
    } catch (er) {
      const errorText = Object.values(er.response.data)[0];
      toastic( errorText)
    }
  };
  
  const fetchUserRating = async () => {
    if (!isUser.email) { return }
    try {
      const responce = await getBookRating(id)
      setUserRating(responce.data.rating);
    }
    catch (er) {
      const errorText = Object.values(er.response.data)[0];
      toastic( errorText)
    }
  };
  
  const addBookRating = async (rating: number) => {
    try {
      const responce = await createBookRating(id, rating)
      // setBookRating(responce.data.rating)
      setUserNewRating(responce.data.rating);
      toastic('Rating was successfully added!')
    }
    catch (er) {
      const errorText = Object.values(er.response.data)[0];
      toastic( errorText);
    }
  };

  const onClickToCart = async () => {
    try {
      const response = await createCartItem(id);
      toastic('Book was added to cart!')
    } catch (er) {
      const errorText = Object.values(er.response.data)[0];
      toastic( errorText);
    }
  };

  useEffect(() => {
    fetchBookDetail();
    fetchUserRating();
  }, [userNewRating, userRating])

  // const overall_rating = (bookDetail.overall_rating).toFixed(1)

  if (!bookDetail) { return null; }

  return (
    <ScrollView>
      <Header></Header>
      <View style={BookDetailStyle.container}>
        <View style={{ flexDirection: 'row', gap: 10, }}>
          <View style={RenderBookItemStyles.book_image_container}>
            <FavoriteIcon id={id} like={bookDetail.like}/>
            <Image style={BookDetailStyle.book_image} source={{ uri: bookDetail.image }} />
          </View>
          <View style={BookDetailStyle.book_detail}>
            <Text style={BookDetailStyle.title_text}>{bookDetail.title}</Text>
            <Text style={BookDetailStyle.text_author}>{bookDetail.author}</Text>
            <View style={{ flexDirection: 'row', gap: 10 }}>
              <Image style={BookDetailStyle.rate_image} source={require('../../images/icons/star.png')} />
              <Text style={BookDetailStyle.text}>{(bookDetail.overall_rating).toFixed(1)}</Text>
            </View>
            {isUser.email && userRating &&
              <View style={{ flexDirection: 'row', gap: 10 }}>
                <Text>Your rate of this book: </Text>
                <Text style={BookDetailStyle.rate_text}>{userRating}</Text>
              </View>
            }
            {isUser.email && !userRating &&
              <View>
                <Rating maxRating={5} size={20} rating={userNewRating} fillColor={'#BFCC94'} onChange={addBookRating} />
                <Text style={BookDetailStyle.text}>Rate this book</Text>
              </View>
            }
          </View>
        </View>
        <Text style={BookDetailStyle.description_text}>Description</Text>
        <Text style={BookDetailStyle.book_body}>{bookDetail.body}</Text>
        <Button style={BookDetailStyle.price_button} text={`$${bookDetail.price} USD`} onPress={onClickToCart} />
        <BookComments id={bookDetail.id} commentList={bookDetail.comments} />
        <BooksRecommend navigation={navigation}/>
      </View>
      <Footer />
    </ScrollView>
  );
};

export default BookDetail;


