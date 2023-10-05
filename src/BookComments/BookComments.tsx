import React, { useEffect, useState } from 'react';
import { View, Image, Text, FlatList, ListRenderItemInfo, } from 'react-native';
import { CommentsType } from '../store/slices/bookSlice';
import { RouteProp } from '@react-navigation/native';
import BookDetailStyle from './BookCommentsStyle';
import { getBookComment } from '../api/book.api';
import { StackScreenProps } from '@react-navigation/stack';

export type RootStackParamList = {
  BookDetail: { id: number }
};

type Props = StackScreenProps<RootStackParamList, 'BookDetail'>;

const BookComments: React.FC<Props> = ({ route }) => {
  const [сomments, setComments] = useState([])
    const { id } = route.params;

  const fetchBookComment = async () => {
    try {
      const response = await getBookComment(id)
      setComments(response.data)
    }
    catch (er) {
      console.log(er);
    }
  };

  useEffect(() => {
    fetchBookComment();
  }, [id])


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
      {сomments.length ? (
        <FlatList
          style={BookDetailStyle.comments_container}
          data={сomments}
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


