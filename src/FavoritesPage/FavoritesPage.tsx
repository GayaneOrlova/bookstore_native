import React, { useEffect } from 'react';
import { FlatList, View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { ScrollView } from 'react-native-gesture-handler';

import { useAppDispatch, useAppSelector } from '../store/hooks';
import { changeFavoriteById, getFavoritesBooks } from '../api/book.api';
import { changeFavoriteList, setFavoriteList } from '../store/slices/bookSlice';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import RenderBookItem from '../RenderBookItem/RenderBookItem';
import favoritesPageStyles from './FavoritesPageStyle';

import { toast } from '../utils/utils';

type Props = {};

type RootStackParamList = {
  BookDetail: { id: number }
};
type NavigationProps = StackNavigationProp<RootStackParamList>;

const FavoritesPage: React.FC<Props> = () => {
  const navigation = useNavigation<NavigationProps>();
  const favoriteList = useAppSelector(state => state.book.favoriteBooks);
  const dispatch = useAppDispatch();

  useEffect(() => {
    (
      async () => {
        try {
          const responce = await getFavoritesBooks();
          dispatch(setFavoriteList(responce.data));
        }
        catch (er) {
          toast('An error occurred');
        };
      })();
  }, []);

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

  return (
    <>
      {favoriteList?.length ? (
        <View>
          <FlatList
            data={favoriteList}
            renderItem={({ item }) => (
              <RenderBookItem item={item} navigation={navigation} onFavoritePress={() => onLikePress(item.id)} />
            )}
            keyExtractor={(item) => item.image}
            numColumns={2}
            contentContainerStyle={favoritesPageStyles.content_container}
            columnWrapperStyle={favoritesPageStyles.column_wrapper}
            ListHeaderComponent={
              <Header />
            }
            ListFooterComponent={
              <Footer />
            }
          />
        </View>
      ) : (
        <ScrollView>
          <Header />
          <Text style={favoritesPageStyles.noFavoriteText}>There are no favorite books yet...</Text>
          <Footer />
        </ScrollView>
      )
      }
    </>
  )
};

export default FavoritesPage;
