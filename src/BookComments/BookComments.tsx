import React, { useEffect, useState } from 'react';
import { View, Image, Text, FlatList, ListRenderItemInfo, } from 'react-native';
import { CommentsType, setBookComments } from '../store/slices/bookSlice';
import BookDetailStyle from './BookCommentsStyle';
import { getBookComment } from '../api/book.api';
import { StackScreenProps } from '@react-navigation/stack';
import { useAppDispatch, useAppSelector } from '../store/hooks';

export type RootStackParamList = {
  BookDetail: { id: number }
};

type Props = StackScreenProps<RootStackParamList, 'BookDetail'>;

const BookComments: React.FC<Props> = ({ route }) => {
  const commentList = useAppSelector(state => state.book.bookComments);
  console.log(commentList, 'commentList')
  const dispatch = useAppDispatch();
  const { id } = route.params;

  const fetchBookComment = async () => {
    try {
      const response = await getBookComment(id);
      dispatch(setBookComments(response.data));
    }
    catch (er) {
      const errorText = Object.values(er.response.data)[0];
      toastic( errorText)
    }
  };

  useEffect(() => {
    fetchBookComment();
  }, [])

  const renderItem = ({ item }: ListRenderItemInfo<CommentsType>) => (
    <View style={BookDetailStyle.comment_item}>
      <View style={BookDetailStyle.detail_info_group}>
        <Image source={{ uri: item.avatar_url }} style={BookDetailStyle.avatar_image} />
        <View >
          <Text style={BookDetailStyle.comment_author}>{item.author}</Text>
          <Text style={BookDetailStyle.comment_time}>{item.created_at}</Text>
        </View>
      </View>
      <Text>{item.body}</Text>
    </View>
  );

  return (
    <>
      {commentList.length ? (
        <FlatList
          style={BookDetailStyle.comments_container}
          data={commentList}
          renderItem={renderItem}
          keyExtractor={(item) => item.created_at}
        />
      ) : (
        <Text>No comments yet</Text>
      )}
    </>
  );
};

export default BookComments;
