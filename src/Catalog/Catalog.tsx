import React, { useEffect, useState } from 'react';
import { FlatList, Image, SafeAreaView, ScrollView, Text, View } from 'react-native';
import HeaderStyles from './CatalogStyle';
import DropDownPicker from 'react-native-dropdown-picker';
import { getAllGenres } from '../api/genre.api';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { getAllBooks } from '../api/book.api';
import { setBooks } from '../store/slices/bookSlice';

type Props = {};

const Catalog: React.FC<Props> = () => {
  const bookList = useAppSelector(state => state.book.booksStore);
  const dispatch = useAppDispatch();

  console.log(bookList)
  // const [selectedGenre, setSelectedGenre] = useState(null);
  // const [genres, setGenres] = useState([]);




  const fetchAllBooks = async () => {
    try {
      const response = await getAllBooks();
      dispatch(setBooks(response.data));
    } catch (er) {
      console.log(er);
    }
  };

  useEffect(() => {
    fetchAllBooks();
  }, []);


  const renderItem = ({ item }) => (
    <View>
      <Text>{item.title}</Text>
      <Image
        style={{ width: 30, height: 40, }} source={{ uri: item.image }}
      />
      <Text>{item.author}</Text>
    </View>
  );

  return (
    <View style={HeaderStyles.catalog_container}>
      <Text style={HeaderStyles.catalog_title}>Catalog</Text>
      <View>
        {/* <DropDownPicker
          items={genres.map((genre) => ({ label: genre.name, value: genre.id }))}
          defaultValue={selectedGenre}
          placeholder="Genre"
          containerStyle={{ height: 40, width: 200 }}
          onChangeItem={(item) => setSelectedGenre(item.value)}
        /> */}
        <View style={{ flexDirection: 'row', gap: 30, }}>
          {bookList.map(item => (
            <View style={{ flexDirection: 'column',}} key={item.id}>
              <Text>{item.title}</Text>
              <Image style={{ width: 30, height: 40, }} source={{ uri: item.image }} />
              <Text>{item.author}</Text>
            </View>
          ))}
        </View>
      </View>

    </View>
  );
};

export default Catalog;