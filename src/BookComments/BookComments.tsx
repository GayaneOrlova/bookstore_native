import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { View, Image, Text, FlatList, ListRenderItemInfo, TextInput, } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { yupResolver } from "@hookform/resolvers/yup";

import { CommentsType } from '../store/slices/bookSlice';
import { createBookComment } from '../api/book.api';
import { useAppSelector } from '../store/hooks';

import Button from '../Button/Button';
import bookCommentsStyle from './BookCommentsStyle';
import bookDetailStyle from '../BookDetail/BookDetailStyle';
import loginStyles from '../Login/LoginStyles';

import { bodySchema } from '../utils/shemas';
import { toast } from '../utils/utils';
import { io } from 'socket.io-client';

type Props = {
  id: number,
  commentList: []
}

const BookComments: React.FC<Props> = (props) => {
  const { control, handleSubmit, setValue, formState: { errors } } = useForm({
    resolver: yupResolver(bodySchema),
  });
  const isUser = useAppSelector(state => state.user.user);
  const [comments, setComments] = useState<CommentsType[]>(props.commentList);

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

    console.log(props.id, "78909876543567890")
    // const socket = io('http://localhost:8000'); 

    if (!socket.connected) {
      socket.connect();
    };

    // const book_id = props.id;
    // socket.emit('connected', { access, book_id: book_id });

    socket.on('new_message', (comment) => {
      setComments((prevComments) => [...prevComments, comment]);

      // (comments.unshift(comment))

      console.log(comment, "comment!!!", comments)
    });

    socket.on('connect', () => {
      console.log('Connected to server');

      // socket.emit(
      // 'auth', {
      //   token: access,
      //   book_id: props.id,
      // }
      // );
    });

    return () => {
      socket.disconnect();
    };
  }, [props.id, access, comments]);


  const onCommentSubmit = async (body: { body: string; }) => {
    try {
      const response = await createBookComment(body.body, props.id);
      const new_message = response.data;
      comments.unshift(new_message);
      setValue('body', '');

      socket.emit('new_message', new_message);
    }
    catch (err: any) {
      const errorText = Object.values(err.response.data)[0];
      toast(errorText)
      setValue('body', '');
    }
  };


  const renderItem = ({ item }: ListRenderItemInfo<CommentsType>) => (
    <View style={bookCommentsStyle.comment_item}>
      <View style={bookCommentsStyle.detail_info_group}>
        <Image source={{ uri: item.avatar_url }} style={bookCommentsStyle.avatar_image} />
        <View >
          <Text style={bookCommentsStyle.comment_author}>{item.author}</Text>
          <Text style={bookCommentsStyle.comment_time}>{item.created_at}</Text>
        </View>
      </View>
      <Text>{item.body}</Text>
    </View>
  );

  return (
    <>
      {!!comments.length ? (
        <FlatList
          style={bookCommentsStyle.comments_container}
          data={comments}
          renderItem={renderItem}
          keyExtractor={(item) => item.created_at}
        />
      ) : (
        <Text>No comments yet</Text>
      )}
      {isUser.email &&
        <View>
          <Controller
            control={control}
            rules={{ required: true, }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={bookDetailStyle.comment_input}
                placeholder="Share a comment"
                onChangeText={onChange}
                defaultValue={value}
              />
            )}
            name="body"
          />
          {errors.body && <Text style={loginStyles.error}>{errors.body.message}</Text>}
          <Button text="Post a comment" style={bookDetailStyle.price_button} onPress={handleSubmit(onCommentSubmit)} />
        </View>
      }

    </>
  );
};

export default BookComments;
