import React, {  } from 'react';
import { View, FlatList, ListRenderItemInfo, Text } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack';
import { useAppSelector } from '../store/hooks';
import { BookType } from '../store/slices/bookSlice';
import BookDetailStyle from './BooksRecommendStyles';
import CatalogStyles from '../Catalog/CatalogStyle';
import RenderBookItem from '../RenderBookItem/RenderBookItem';
import { isDraft } from '@reduxjs/toolkit';

type Props = {
  navigation: any;
};

type RootStackParamList = {
  BookDetail: { id: number }
};
type NavigationProps = StackNavigationProp<RootStackParamList>;

const BooksRecommend: React.FC<Props> = ({navigation}) => {
  // const { id } = route.params;
  // const route = useRoute();
  // const id = route.params?.id;
  // const navigation = useNavigation();


  const bookList = useAppSelector(state => state.book.booksStore);
  // console.log(bookList, 'bookList')
  return (
    <View>
        <Text style={BookDetailStyle.title_text}>Recommendations</Text>
        <FlatList
          data={bookList.filter((book) => book.recommendation)}
          renderItem={({ item }: ListRenderItemInfo<BookType>) => (
            <RenderBookItem item={item} navigation={navigation}/>
          )}
          keyExtractor={(item, index) => item.author}
          numColumns={2}
          contentContainerStyle={CatalogStyles.content_container}
          columnWrapperStyle={CatalogStyles.column_wrapper}
        />
      </View>
  );
};

export default BooksRecommend;


