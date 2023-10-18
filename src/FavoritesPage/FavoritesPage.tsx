import React, { useEffect } from 'react';
import { FlatList, View, Text } from 'react-native';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { ScrollView } from 'react-native-gesture-handler';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { changeFavoriteList, setFavoriteList } from '../store/slices/bookSlice';
import RenderBookItem from '../RenderBookItem/RenderBookItem';
import FavoritesPageStyles from './FavoritesPageStyle';
import { changeFavoriteById, getFavoritesBooks } from '../api/book.api';
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

  useEffect(() => {(
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
    catch (er) {
      const errorText = Object.values(er.response.data);
      toast(errorText);
    }
  };

  return (
    <ScrollView>
      <Header />
      {favoriteList?.length ? (
        <View style={FavoritesPageStyles.catalog_container}>
          <FlatList
            data={favoriteList}
            renderItem={({ item }) => (
              <RenderBookItem item={item} navigation={navigation} onFavoritePress={() => onLikePress(item.id)} />
            )}
            keyExtractor={(item) => item.image}
            numColumns={2}
            contentContainerStyle={FavoritesPageStyles.content_container}
            columnWrapperStyle={FavoritesPageStyles.column_wrapper}
          />
        </View>
      ) : (
        <Text style={FavoritesPageStyles.noFavoriteText}>There are no favorite books yet...</Text>
      )
      }
      <Footer />
    </ScrollView>
  )
};

export default FavoritesPage;
