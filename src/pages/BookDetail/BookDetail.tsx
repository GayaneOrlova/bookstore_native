import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { BookType, changeCartItem } from '../../store/slices/bookSlice';
import { createBookRating, createCartItem, getBookById } from '../../api/book.api';

import BookComments from './BookComments/BookComments';

import { toast } from '../../utils/utils';

type Props = {};

type RootStackParamList = {
  BookDetail: { id: number }
};
type NavigationProps = StackNavigationProp<RootStackParamList>;

const BookDetail: React.FC<Props> = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<NavigationProps>();
  const allComments = useAppSelector(state => state.book.bookComments);

  const route = useRoute();
  const id = route.params?.id;

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
  }, [userNewRating, allComments])

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
    <View>
      <BookComments
        id={bookDetail.id}
        commentList={bookDetail.comments}
        bookDetail={bookDetail}
        userNewRating={userNewRating!}
        addBookRating={addBookRating}
        onClickToCart={onClickToCart}
      />
    </View>
  );
};

export default BookDetail;


