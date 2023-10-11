import React, { useEffect, useState } from 'react';
import { Controller, useForm } from "react-hook-form";
import { View, FlatList, Image, ListRenderItemInfo, Text, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Rating } from '@kolking/react-native-rating';
import { StackScreenProps } from '@react-navigation/stack';
import { ScrollView } from 'react-native-gesture-handler';
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppSelector } from '../store/hooks';
import { BookType } from '../store/slices/bookSlice';
import { createBookComment, createBookRating, createCartItem, getBookById, getBookRating } from '../api/book.api';
import Header from '../Header/Header';
import Button from '../Button/Button';
import Footer from '../Footer/Footer';
import BookDetailStyle from './BookDetailStyle';
import CatalogStyles from '../Catalog/CatalogStyle';
import LoginStyles from '../Login/LoginStyles';
import RenderBookItemStyles from '../RenderBookItem/RenderBookItemStyles';
import FavoriteIcon from '../FavoriteIcon/FavoriteIcon';
import RenderBookItem from '../RenderBookItem/RenderBookItem';
import BookComments from '../BookComments/BookComments';

import { toastic } from '../utils/utils';


type RootStackParamList = {
  BookDetail: { id: number }
};
type Props = StackScreenProps<RootStackParamList, 'BookDetail'>;


const BookDetail: React.FC<Props> = ({route}) => {
  const navigation = useNavigation();
  const { id } = route.params;
  const isUser = useAppSelector(state => state.user.user);
  const bookList = useAppSelector(state => state.book.booksStore);
  const book = bookList.find(book => book.id === id)
  
  console.log(id, '11111')
  const [bookDetail, setBookDetail] = useState<BookType>();
  const [userRating, setUserRating] = useState();
  const [userNewRating, setUserNewRating] = useState();

  const schema = yup.object().shape({
    body: yup.string().required('Comment is required'),
  });

  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const fetchBookDetail = async () => {
    if (!id) { return; }
    try {
      const response = await getBookById(id);
      setBookDetail(response.data);
    } catch (er) {
      const errorText = Object.values(er.response.data)[0];
      toastic( errorText)
    }
  }
  const addBookRating = async (rating: number) => {
    try {
      const responce = await createBookRating(id, rating)
      // setBookRating(responce.data.rating)
      setUserNewRating(responce.data.rating);
      toastic('Rating was successfully added!')
    }
    catch (er) {
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

  const onCommentSubmit = async (body: { body: string }) => {
    try {
      const response = await createBookComment(id, body.body)
      console.log('response', response.data)
      // setComments(response.data)
    }
    catch (er) {
      const errorText = Object.values(er.response.data)[0];
      toastic( errorText)
    }
  };

  const onClickToCart = async () => {
    try {
      const response = await createCartItem(id);
      toastic('Book was added to cart!')
    } catch (er) {
      const errorText = Object.values(er.response.data)[0];
      toastic( errorText)
    }
  };

  useEffect(() => {
    fetchBookDetail();
    fetchUserRating();
  }, [userNewRating, userRating])

  const overall_rating = (bookDetail.overall_rating).toFixed(1)

  if (!bookDetail) { return null; }

  return (
    <ScrollView>
      <Header></Header>
      <View style={BookDetailStyle.container}>
        <View style={{ flexDirection: 'row', gap: 10, }}>
          <View style={RenderBookItemStyles.book_image_container}>
            <FavoriteIcon id={id} like={book!.like}/>
            <Image style={BookDetailStyle.book_image} source={{ uri: bookDetail.image }} />
          </View>
          <View style={BookDetailStyle.book_detail}>
            <Text style={BookDetailStyle.title_text}>{bookDetail.title}</Text>
            <Text style={BookDetailStyle.text_author}>{bookDetail.author}</Text>
            <View style={{ flexDirection: 'row', gap: 10 }}>
              <Image style={BookDetailStyle.rate_image} source={require('../../images/icons/star.png')} />
              <Text style={BookDetailStyle.text}>{overall_rating}</Text>
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
        <BookComments route={{ params: { id: id }}} />
        {isUser.email &&
          <View>
            <Controller
              control={control}
              rules={{ required: true, }}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={BookDetailStyle.comment_input}
                  placeholder="Share a comment"
                  onChangeText={onChange}
                  defaultValue={value}
                />
              )}
              name="body"
            />
            {errors.body && <Text style={LoginStyles.error}>{errors.body.message}</Text>}
            <Button text="Post a comment" style={BookDetailStyle.price_button} onPress={handleSubmit(onCommentSubmit)} />
          </View>
        }
        <Text style={BookDetailStyle.title_text}>Recommendations</Text>
        <FlatList
          data={bookList.filter((book) => book.recommendation)}
          renderItem={({ item }: ListRenderItemInfo<BookType>) => (
            <RenderBookItem item={item} navigation={navigation} />
          )}
          keyExtractor={(item, index) => item.author}
          numColumns={2}
          contentContainerStyle={CatalogStyles.content_container}
          columnWrapperStyle={CatalogStyles.column_wrapper}
        />
      </View>
      <Footer />
    </ScrollView>
  );
};

export default BookDetail;


