import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { View, Text, TextInput, } from 'react-native';
import { yupResolver } from "@hookform/resolvers/yup";

import { CommentsType, setComments } from '../../../store/slices/bookSlice';
import { createBookComment } from '../../../api/book.api';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';

import Button from '../../Button/Button';
import bookCommentsStyle from './BookCommentsStyle';
import loginStyles from '../../Login/LoginStyles';

import { bodySchema } from '../../../utils/shemas';
import { toast } from '../../../utils/utils';
import { Socket } from 'socket.io-client';


type Props = {
  id: number,
  commentList: [],
  comments: CommentsType[],
  socket: Socket<any>,
}

const PostComment: React.FC<Props> = (props) => {
  const dispatch = useAppDispatch();
  const isUser = useAppSelector(state => state.user.user);
  const { control, handleSubmit, setValue, formState: { errors } } = useForm({
    resolver: yupResolver(bodySchema),
  });

  const onCommentSubmit = async (body: { body: string; }) => {
    try {
      const response = await createBookComment(body.body, props.id);
      const new_message = response.data;
      props.comments.unshift(new_message);
      dispatch(setComments(new_message));
      setValue('body', '');

      props.socket.emit('new_message', new_message);
    }
    catch (err: any) {
      const errorText = Object.values(err.response.data)[0];
      toast(errorText)
      setValue('body', '');
    }
  };

  return (
    <>
      {isUser.email &&
        <View style={bookCommentsStyle.post_comment}>
          <Controller
            control={control}
            rules={{ required: true, }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={bookCommentsStyle.comment_input}
                placeholder="Share a comment"
                onChangeText={onChange}
                defaultValue={value}
              />
            )}
            name="body"
          />
          {errors.body && <Text style={loginStyles.error}>{errors.body.message}</Text>}
          <Button text="Post a comment" style={bookCommentsStyle.price_button} onPress={handleSubmit(onCommentSubmit)} />
        </View>
      }
    </>
  );
};

export default PostComment;
