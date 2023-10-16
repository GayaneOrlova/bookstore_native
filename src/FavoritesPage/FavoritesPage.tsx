import React, { useEffect, useState } from 'react';
import { FlatList, ListRenderItemInfo, View, Text } from 'react-native';
import { useAppSelector } from '../store/hooks';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { ScrollView } from 'react-native-gesture-handler';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { BookType } from '../store/slices/bookSlice';
import RenderBookItem from '../RenderBookItem/RenderBookItem';
import FavoritesPageStyles from './FavoritesPageStyle';
import { getFavoritesBooks } from '../api/book.api';
import { toastic } from '../utils/utils';

type Props = {};

type RootStackParamList = {
  BookDetail: { id: number }
};

type NavigationProps = StackNavigationProp<RootStackParamList>;

const FavoritesPage: React.FC<Props> = () => {
  const navigation = useNavigation<NavigationProps>();
  const [favorites, setFavorites] = useState<BookType[]>();
  
  const getFavoriteBooks = async () => {
    try {
      const responce = await getFavoritesBooks();
      
      setFavorites(responce.data);
      console.log(responce.data, 'responce.data)')

    }
    catch (er) {
      toastic('An error occurred');
    }
  };

  console.log(favorites, 'responce')

  useEffect(() => {
    getFavoriteBooks();
  }, [])


  return (
    <ScrollView>
      <Header />
      {favorites?.length ? (
        <View style={FavoritesPageStyles.catalog_container}>
          <FlatList
            data={favorites}
            renderItem={({ item }) => (
              <RenderBookItem item={item} navigation={navigation} />
            )}
            keyExtractor={(item) => item.image}
            numColumns={2}
            contentContainerStyle={FavoritesPageStyles.content_container}
            columnWrapperStyle={FavoritesPageStyles.column_wrapper}
          />
        </View>
      ) : (
        <Text>There are no favorite books yet...</Text>
      )
      }
      <Footer />
    </ScrollView>
  )
};

export default FavoritesPage;
