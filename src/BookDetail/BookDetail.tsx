import React, { useEffect, useState } from 'react';
import { View, Image, Text } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Rating } from '@kolking/react-native-rating';
import { StackNavigationProp } from '@react-navigation/stack';
import { ScrollView } from 'react-native-gesture-handler';
import { useAppSelector } from '../store/hooks';
import { BookType } from '../store/slices/bookSlice';
import { createBookRating, createCartItem, getBookById } from '../api/book.api';
import { toastic } from '../utils/utils';
import Header from '../Header/Header';
import Button from '../Button/Button';
import Footer from '../Footer/Footer';
import BookDetailStyle from './BookDetailStyle';
import RenderBookItemStyles from '../RenderBookItem/RenderBookItemStyles';
import FavoriteIcon from '../FavoriteIcon/FavoriteIcon';
import BookComments from '../BookComments/BookComments';
import BooksRecommend from '../BooksRecommend/BooksRecommend';

type Props = {};

type RootStackParamList = {
  BookDetail: { id: number }
};

type NavigationProps = StackNavigationProp<RootStackParamList>;

const BookDetail: React.FC<Props> = () => {
  const navigation = useNavigation<NavigationProps>();
  const route = useRoute();
  const id = route.params?.id;
  const isUser = useAppSelector(state => state.user.user);
  const [bookDetail, setBookDetail] = useState<BookType>({});
  const [userNewRating, setUserNewRating] = useState();
  
  const fetchBookDetail = async () => {
    if (!id) { return; }
    try {
      const response = await getBookById(id);
      setBookDetail(response.data);
    } catch (er) {
      toastic('An error occurred');
    }
  };

  const addBookRating = async (rating: number) => {
    try {
      const responce = await createBookRating(id, rating)
      setUserNewRating(responce.data.rating);
      toastic('Rating was successfully added!')
    }
    catch (er) {
      toastic('An error occurred');
    }
  };

  useEffect(() => {
    fetchBookDetail();
  }, [userNewRating])
  
  const onClickToCart = async () => {
    try {
      await createCartItem(id);
      toastic('Book was added to cart!')
    } catch (er) {
      toastic('An error occurred');
    }
  };

  if (!bookDetail) { return null; }

  return (
    <ScrollView>
      <Header></Header>
      <View style={BookDetailStyle.container}>
        <View style={BookDetailStyle.book_info}>
          <View style={RenderBookItemStyles.book_image_container}>
            <Image style={BookDetailStyle.book_image} source={{ uri: bookDetail.image }} />
          </View>
          <View style={BookDetailStyle.book_detail}>
            <Text style={BookDetailStyle.title_text}>{bookDetail.title}</Text>
            <Text style={BookDetailStyle.text_author}>{bookDetail.author}</Text>
            <View style={BookDetailStyle.book_info}>
              <Image style={BookDetailStyle.rate_image} source={require('../../images/icons/star.png')} />
              <Text style={BookDetailStyle.text}>{(bookDetail.overall_rating).toFixed(1)}</Text>
            </View>
            {isUser.email && bookDetail.rating &&
              <View style={BookDetailStyle.book_info}>
                <Text>Your rate of this book: </Text>
                <Text style={BookDetailStyle.rate_text}>{(bookDetail.overall_rating).toFixed(1)}</Text>
              </View>
            }
            {isUser.email && !bookDetail.rating &&
              <View>
                <Rating onChange={addBookRating} maxRating={5} size={20} rating={userNewRating} fillColor={'#BFCC94'}  />
                <Text style={BookDetailStyle.text}>Rate this book</Text>
              </View>
            }
          </View>
        </View>
        <Text style={BookDetailStyle.description_text}>Description</Text>
        <Text style={BookDetailStyle.book_body}>{bookDetail.body}</Text>
        <Button style={BookDetailStyle.price_button} onPress={onClickToCart} text={`$${bookDetail.price} USD`}  />
        <BookComments id={bookDetail.id} commentList={bookDetail.comments} />
        <BooksRecommend navigation={navigation} />
      </View>
      <Footer />
    </ScrollView>
  );
};

export default BookDetail;


