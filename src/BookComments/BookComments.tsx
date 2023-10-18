import React, { useEffect, useState } from 'react';
import { View, Image, Text, FlatList, ListRenderItemInfo, TextInput, } from 'react-native';
import { yupResolver } from "@hookform/resolvers/yup";
import { CommentsType } from '../store/slices/bookSlice';
import { createBookComment } from '../api/book.api';
import { useAppSelector } from '../store/hooks';
import { toast } from '../utils/utils';
import { Controller, useForm } from 'react-hook-form';
import BookCommentsStyle from './BookCommentsStyle';
import { bodySchema } from '../utils/shemas';
import BookDetailStyle from '../BookDetail/BookDetailStyle';
import Button from '../Button/Button';
import LoginStyles from '../Login/LoginStyles';


type Props = {
  id: number,
  commentList: []
}

const BookComments: React.FC<Props> = ({ commentList, id }) => {
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(bodySchema),
  });
  const isUser = useAppSelector(state => state.user.user);
  const [comments, setComments] = useState<CommentsType[]>(commentList);
  
  const onCommentSubmit = async (body: { body: string; }) => {
    try {
      const response = await createBookComment(body.body, id);
      comments.unshift(response.data);
    }
    catch (er) {
      const errorText = Object.values(er.response.data)[0];
      toast(errorText)
    }
  };
  
  const renderItem = ({ item }: ListRenderItemInfo<CommentsType>) => (
    <View style={BookCommentsStyle.comment_item}>
      <View style={BookCommentsStyle.detail_info_group}>
        <Image source={{ uri: item.avatar_url }} style={BookCommentsStyle.avatar_image} />
        <View >
          <Text style={BookCommentsStyle.comment_author}>{item.author}</Text>
          <Text style={BookCommentsStyle.comment_time}>{item.created_at}</Text>
        </View>
      </View>
      <Text>{item.body}</Text>
    </View>
  );

  return (
    <>
      {!!comments.length ? (
        <FlatList
          style={BookCommentsStyle.comments_container}
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

    </>
  );
};

export default BookComments;
