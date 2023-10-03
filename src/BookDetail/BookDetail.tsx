import React, { useEffect, useState } from 'react';
import { Controller, useForm } from "react-hook-form";
import { View, ScrollView, FlatList, Image, ListRenderItemInfo, Modal, Text, TextInput } from 'react-native';
import { Rating } from '@kolking/react-native-rating';
import { StackScreenProps } from '@react-navigation/stack';
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppSelector } from '../store/hooks';
import { BookType, CommentsType } from '../store/slices/bookSlice';
import { createBookComment, createBookRating, getBookById, getBookComment, getBookRating } from '../api/book.api';
import Header from '../Header/Header';
import Button from '../Button/Button';
import Footer from '../Footer/Footer';
import BookDetailStyle from './BookDetailStyle';
import CatalogStyles from '../Catalog/CatalogStyle';
import LoginStyles from '../Login/LoginStyles';

type RootStackParamList = {
  BookDetail: { id: number }
};

type Props = StackScreenProps<RootStackParamList, 'BookDetail'>;

const BookDetail: React.FC<Props> = ({ route }) => {
  const isUser = useAppSelector(state => state.user.user);
  const bookList = useAppSelector(state => state.book.booksStore);

  const [bookDetail, setBookDetail] = useState<BookType>();
  const [userRating, setUserRating] = useState();
  const [userNewRating, setUserNewRating] = useState();
  const [showModal, setShowModal] = useState(false)
  const [сomments, setComments] = useState([])

  const schema = yup.object().shape({
    body: yup.string().required('Comment is required'),
  });

  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const { id } = route.params;

  const fetchBookDetail = async () => {
    if (!id) { return; }
    try {
      const response = await getBookById(id);
      setBookDetail(response.data);
    } catch (er) {
      console.log(er);
    }
  }

  const addBookRating = async (rating: number) => {
    try {
      const responce = await createBookRating(id, rating)
      // setBookRating(responce.data.rating)
      setUserNewRating(responce.data.rating);
      setShowModal(true);
      setTimeout(() => {
        setShowModal(false);
      }, 2000);
    }
    catch (er) {
      console.log(er);
    }
  };

  const fetchUserRating = async () => {
    if (!isUser.email) { return }
    try {
      const responce = await getBookRating(id)
      // if (responce.data.rating) {
      setUserRating(responce.data.rating);
      console.log('?', responce.data)
      //   }
      //   else { setUserRating(0); }
    }
    catch (er) {
      console.log(er);
    }
  };

  const fetchBookComment = async () => {
    try {
      const response = await getBookComment(id)
      setComments(response.data)
    }
    catch (er) {
      console.log(er);
    }
  };

  const onSubmit = async (body: string) => {
    console.log(id, body)
    try {
      const response = await createBookComment(id, body)
      console.log(id, response.data)
      setComments(response.data)
    }
    catch (er) {
      console.log(er);
    }
  };


  const renderItem = ({ item }: ListRenderItemInfo<CommentsType>) => (
    <View style={BookDetailStyle.comment_item}>
      <View style={BookDetailStyle.card_group}>
        <Image source={{ uri: item.avatar_url }} style={BookDetailStyle.avatar_image} />
        <View >
          <Text style={BookDetailStyle.comment_author}>{item.author}</Text>
          <Text style={BookDetailStyle.comment_time}>{item.created_at}</Text>
        </View>
      </View>
      <Text>{item.body}</Text>
    </View>
  );

  const onCartClick = () => {
  };

  useEffect(() => {
    fetchBookComment();
  }, [])

  useEffect(() => {
    fetchBookDetail();
    fetchUserRating();
  }, [userNewRating, userRating])

  if (!bookDetail) { return null; }

  return (
    <ScrollView>
      <Header></Header>
      <View style={BookDetailStyle.container}>
        <View style={BookDetailStyle.card_group}>
          <Image style={BookDetailStyle.book_image} source={{ uri: bookDetail.image }} />
          <View style={BookDetailStyle.book_detail}>
            <Text style={BookDetailStyle.title_text}>{bookDetail.title}</Text>
            <Text style={BookDetailStyle.text_detail}>
              {bookDetail.author}
            </Text>
            <View style={BookDetailStyle.card_group}>
              <Image style={BookDetailStyle.rate_image} source={require('../../images/icons/star.png')} />
              <Text style={BookDetailStyle.text}>{(bookDetail.overall_rating).toFixed(1)}</Text>
            </View>
            {isUser.email && userRating &&
              <View style={BookDetailStyle.card_group}>
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
            <Modal visible={showModal} transparent>
              <View style={BookDetailStyle.modal}>
                <View style={BookDetailStyle.modal_text}>
                  <Text>Rating was successfully add!</Text>
                </View>
              </View>
            </Modal>
          </View>
        </View>
        <Text style={BookDetailStyle.description_text}>Description</Text>
        <Text style={BookDetailStyle.book_body}>{bookDetail.body}</Text>
        <Button style={BookDetailStyle.price_button} text={`$${bookDetail.price} USD`} onPress={onCartClick} />
        <FlatList
          style={BookDetailStyle.card_group}
          data={сomments}
          renderItem={renderItem}
          keyExtractor={(item) => item.created_at}
        />
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
          <Button text="Post a comment" style={BookDetailStyle.price_button} onPress={handleSubmit(onSubmit)} />
        </View>
        <Text style={BookDetailStyle.title_text}>Recommendations</Text>
        <FlatList
          data={bookList.filter((book) => book.recommendation)}
          renderItem={({ item }) => (
            <View>
              <Text>{item.title}</Text>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
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


