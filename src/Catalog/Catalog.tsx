import React, { useEffect, useState } from 'react';
import { FlatList, Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import HeaderStyles from './CatalogStyle';
import DropDownPicker from 'react-native-dropdown-picker';
import { getAllGenres } from '../api/genre.api';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { getAllBooks, getBookById } from '../api/book.api';
import { setBooks } from '../store/slices/bookSlice';
import { MultipleSelectList } from 'react-native-dropdown-select-list';

import Button from '../Button/Button';
import { Rating } from '@kolking/react-native-rating';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome6Pro';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import CatalogStyles from './CatalogStyle';


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

  const onCartClick = () => {
    console.log('New rating:');
  }

  const [liked, setLiked] = useState(false);

  const handleLikePress = () => {
    setLiked(!liked);
  };



  const renderBookItem = ({ item }) => (
    <View style={CatalogStyles.book_item}>
      <View style={CatalogStyles.image_container}>

        <View style={CatalogStyles.icon_container}>
          <TouchableOpacity
            style={[CatalogStyles.favorite_button, liked && CatalogStyles.favorite_button_liked]}
            onPress={handleLikePress}
          >
            <FontAwesomeIcon
              icon={faHeart}
              // name="heart"
              size={10}
              color={liked ? '#ffffff' : 'transparent'}
              style={CatalogStyles.favorite_icon}
            />
          </TouchableOpacity>
        </View>
        <Image style={{ width: 135, minHeight: 192 }} source={{ uri: item.image }} />
      </View>
      <Text style={CatalogStyles.text_title}>{item.title}</Text>
      <Text style={CatalogStyles.text_author}>{item.author}</Text>
      <View style={CatalogStyles.rating_container}>
        <Rating size={20} rating={item.overall_rating} fillColor={'#BFCC94'} />
        <Text style={CatalogStyles.rating_text}>{(item.overall_rating.toFixed(1))}</Text>
      </View>
      <Button style={CatalogStyles.price_button} text={`$${item.price} USD`} onPress={onCartClick} />
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
            contentContainerStyle={CatalogStyles.content_container}
            columnWrapperStyle={CatalogStyles.column_wrapper}
          />
          {/* </ScrollView> */}
        </View>
      </View>

    </View>
  );
};

export default Catalog;

