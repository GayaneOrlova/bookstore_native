import React, { useEffect, useState } from 'react';
import { FlatList, Image, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import HeaderStyles from './CatalogStyle';
import DropDownPicker from 'react-native-dropdown-picker';
import { getAllGenres } from '../api/genre.api';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { getAllBooks } from '../api/book.api';
import { setBooks } from '../store/slices/bookSlice';
import {MultipleSelectList} from 'react-native-dropdown-select-list';

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


  const renderBookItem = ({ item }) => (
    <View>
      <Text>{item.title}</Text>
      <Image
        style={{ width: 135, height: 192, }} source={{ uri: item.image }}
      />
      <Text>{item.author}</Text>
    </View>
  );
  
  const renderGenreItem = ({ item }) => (
    <View 
    // style={{flexDirection: 'column'}}
    >
      <Image
        style={{ width: 135, height: 192, }} source={{ uri: item.image }}
      />
      <Text>{item.title}</Text>
      <Text>{item.author}</Text>
    </View>
  );
  
  const genreData = [1,2,3];
  const sortData = [1, 2, 3];

  const handleGenreSelection = () => {
  };
  
  
  return (
    <View style={HeaderStyles.catalog_container}>
      <Text style={HeaderStyles.catalog_title}>Catalog</Text>
      <View>
      <MultipleSelectList
        placeholder='Genre'
        setSelected={handleGenreSelection}
        search={false}
        boxStyles={HeaderStyles.selector}
        dropdownStyles={HeaderStyles.container}
        data={genreData}
    />
    <MultipleSelectList
        placeholder={`Sort by`}
        setSelected={handleGenreSelection}
        search={false}
        boxStyles={HeaderStyles.selector}
        dropdownStyles={HeaderStyles.container}
        data={sortData}
    />
      
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <ScrollView horizontal={true} style={{ flexGrow: 1 }}>
            <FlatList
              data={bookList}
              renderItem={renderBookItem}
              keyExtractor={(item, index) => index.toString()}
              numColumns={2}
              contentContainerStyle={{ justifyContent: 'space-between', gap: 20 }}
            />
          </ScrollView>
        </View>
      </View>

    </View>
  );
};

export default Catalog;

