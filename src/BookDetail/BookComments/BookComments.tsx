import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ListRenderItemInfo, ScrollView, } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { BookType, CommentsType } from '../../store/slices/bookSlice';
import { useAppSelector } from '../../store/hooks';

import RenderItemComments from './RenderItemComments/RenderItemComments';
import Footer from '../../Footer/Footer';

import { io } from 'socket.io-client';
import PostComment from './PostComment';
import ListHeaderComponent from './ListHeaderComponentStyle/ListHeaderComponent';
import bookCommentsStyle from './BookCommentsStyle';


type Props = {
  id: number,
  commentList: [],

  bookDetail: BookType;
  userNewRating: number;
  addBookRating: (rating: number) => Promise<void>;
  onClickToCart: () => void;
}

const BookComments: React.FC<Props> = (props) => {
  const isUser = useAppSelector(state => state.user.user);
  const [comments, setComments] = useState<CommentsType[]>(props.commentList);
console.log('!!!', comments)
  const [access, setAccess] = useState<string>('');

  const token = async () => {
    const responce = await AsyncStorage.getItem('access');
    setAccess(responce!);
  };

  useEffect(() => {
    token();
  }, [])

  const URL = 'http://localhost:8000/';

  const socket = io(URL, {
    auth: { access, "book_id": props.id },
  });

  useEffect(() => {
    if (!socket.connected) {
      socket.connect();
    };

    socket.on('new_message', (comment) => {
      setComments((prevComments) => [comment, ...prevComments]);
    });

    socket.on('connect', () => {
    });

    return () => {
      socket.disconnect();
    };
  }, [props.id, access, comments]);

  return (
    <>
      {!!comments.length ? (
        <FlatList
          data={comments}
          renderItem={({ item }: ListRenderItemInfo<CommentsType>) => (
            <RenderItemComments item={item} />
          )}

          keyExtractor={(item) => item.created_at}
          ListHeaderComponent={
            <ListHeaderComponent
              bookDetail={props.bookDetail}
              addBookRating={props.addBookRating}
              userNewRating={props.userNewRating!}
              onClickToCart={props.onClickToCart}
            />}
          ListFooterComponent={
            <View>
              {isUser.email && <PostComment id={props.id} commentList={props.commentList} comments={comments} socket={socket} />}
              <Footer />
            </View>
          }
        />
      ) : (
        <ScrollView>
          <ListHeaderComponent
            bookDetail={props.bookDetail}
            addBookRating={props.addBookRating}
            userNewRating={props.userNewRating!}
            onClickToCart={props.onClickToCart}
          />
          <Text style={bookCommentsStyle.post_comment}>No comments yet</Text>
          {isUser.email && <PostComment id={props.id} commentList={props.commentList} comments={comments} socket={socket} />}
          <Footer />
        </ScrollView>
      )}
    </>
  );
};

export default BookComments;
