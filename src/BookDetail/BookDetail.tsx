import React, { useEffect, useState } from 'react';
import { View, Image, Text } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Rating } from '@kolking/react-native-rating';
import { StackNavigationProp } from '@react-navigation/stack';
import { ScrollView } from 'react-native-gesture-handler';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { BookType, changeCartItem } from '../store/slices/bookSlice';
import { createBookRating, createCartItem, getBookById } from '../api/book.api';
import { toast } from '../utils/utils';
import Header from '../Header/Header';
import Button from '../Button/Button';
import Footer from '../Footer/Footer';
import BookDetailStyle from './BookDetailStyle';
import RenderBookItemStyles from '../RenderBookItem/RenderBookItemStyles';
import BookComments from '../BookComments/BookComments';
import BooksRecommend from '../BooksRecommend/BooksRecommend';

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
              <Text style={BookDetailStyle.text}>{(bookDetail?.overall_rating).toFixed(1)}</Text>
            </View>
            {isUser.email && bookDetail.rating &&
              <View style={BookDetailStyle.book_info}>
                <Text>Your rate of this book: </Text>
                <Text style={BookDetailStyle.rate_text}>{(bookDetail.overall_rating).toFixed(1)}</Text>
              </View>
            }
            {isUser.email && !bookDetail.rating &&
              <View>
                <Rating onChange={addBookRating} maxRating={5} size={20} rating={userNewRating} fillColor={'#BFCC94'} />
                <Text style={BookDetailStyle.text}>Rate this book</Text>
              </View>
            }
          </View>
        </View>
        <Text style={BookDetailStyle.description_text}>Description</Text>
        <Text style={BookDetailStyle.book_body}>{bookDetail.body}</Text>
        <Button style={bookDetail.available ? BookDetailStyle.price_button : BookDetailStyle.available_button} text={bookDetail.available ? `$${bookDetail.price} USD` : 'Not available'} onPress={onClickToCart} />
        <BookComments id={bookDetail.id} commentList={bookDetail.comments} />
      </View>
      <Footer />
    </ScrollView>
  );
};

export default BookDetail;


