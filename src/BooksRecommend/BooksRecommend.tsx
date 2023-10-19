import React, { useEffect, useState } from 'react';
import { View, FlatList, ListRenderItemInfo, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { useAppDispatch, useAppSelector } from '../store/hooks';
import { BookType, changeFavoriteList } from '../store/slices/bookSlice';
import { changeFavoriteById, getRecommended } from '../api/book.api';

import booksRecommendStyle from './BooksRecommendStyles';
import catalogStyles from '../Catalog/CatalogStyle';
import RenderBookItem from '../RenderBookItem/RenderBookItem';

import { toast } from '../utils/utils';

type Props = {
  navigation: any;
};

type RootStackParamList = {
  BookDetail: { id: number }
};
type NavigationProps = StackNavigationProp<RootStackParamList>;

const BooksRecommend: React.FC<Props> = () => {
  const dispatch = useAppDispatch();
  const favoriteList = useAppSelector(state => state.book.favoriteBooks);
  const navigation = useNavigation<NavigationProps>();
  
  const [recommended, setRecommended] = useState<BookType[]>();
  
  const getRecommendedBooks = async () => {
    try {
      const responce = await getRecommended();
      setRecommended(responce.data);
    }
    catch (er) {
      toast('An error occurred');
    }
  };
  
  const onLikePress = async (id: number) => {
    try {
      const responce = await changeFavoriteById(id);
      dispatch(changeFavoriteList(id));
    }
    catch (err: any) {
      const errorText = Object.values(err.response.data);
      toast(errorText);
    }
  };

  useEffect(() => {
    getRecommendedBooks();
  }, [])


  return (
    <View>
        <Text style={booksRecommendStyle.title_text}>Recommendations</Text>
        <FlatList
          data={recommended}
          renderItem={({ item }: ListRenderItemInfo<BookType>) => (
            <RenderBookItem item={item} navigation={navigation} onFavoritePress={() => onLikePress(item.id)}/>
          )}
          keyExtractor={(item, index) => item.author}
          numColumns={2}
          contentContainerStyle={catalogStyles.content_container}
          columnWrapperStyle={catalogStyles.column_wrapper}
        />
      </View>
  );
};

export default BooksRecommend;


