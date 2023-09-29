import React, { useEffect, useState } from 'react';
import { FlatList, Image, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import HeaderStyles from './CatalogStyle';
import DropDownPicker from 'react-native-dropdown-picker';
import { getAllGenres } from '../api/genre.api';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { getAllBooks } from '../api/book.api';
import { setBooks } from '../store/slices/bookSlice';
import { MultipleSelectList } from 'react-native-dropdown-select-list';

import { AirbnbRating} from 'react-native-ratings';
import Button from '../Button/Button';
import { Rating } from '@kolking/react-native-rating';


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
      console.log("!!!!!!!paddingTop")
    } catch (er) {
      console.log(er);
    }
  };


  useEffect(() => {
    fetchAllBooks();
  }, []);

  const handleRatingChange = (rating) => {
    console.log('New rating:', rating);
  }

const onCartClick = () => {
}
  const STAR_IMAGE = require('../../images/icons/star.png')

  const renderBookItem = ({ item }) => (
    <View style={{ minHeight: 333, alignItems: 'left', paddingTop: 10 }}>
      <Image style={{ width: 135, minHeight: 192, }} source={{ uri: item.image }} />
      <Text style={{ color: '#344966', paddingTop: 10 }}>{item.title}</Text>
      <Text style={{ color: '#B9BAC3', paddingTop: 10 }}>{item.author}</Text>
      <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
        <AirbnbRating
          reviews={[]}
          count={5}
          defaultRating={1}
          size={20}
          selectedColor={'#BFCC94'}
          onFinishRating={handleRatingChange}
          reviewSize={0}
        />
      <Rating size={20} rating={4} fillColor={'#BFCC94'} onChange={handleRatingChange} />
        <Text style={{fontSize: 16, color: '#B9BAC3' }}>5.0</Text>
      </View>
      <Button style={{width: 135, height: 34, marginVertical: 10 }} text={'$ цена USD'} onPress={onCartClick} />

    </View>
  );



  const genreData = [1, 2, 3];
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

        <View>
          {/* <ScrollView horizontal={true} style={{ flexGrow: 1, gap: 20 }}> */}
          <FlatList
            data={bookList}
            renderItem={renderBookItem}
            keyExtractor={(item, index) => index.toString()}
            numColumns={2}
            contentContainerStyle={{ justifyContent: 'space-between', gap: 10 }}
            columnWrapperStyle={{ justifyContent: 'space-between' }}
          />
          {/* </ScrollView> */}
        </View>
      </View>

    </View>
  );
};

export default Catalog;

