import React, { useEffect, useState } from 'react';
import { FlatList, Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { getAllGenres } from '../api/book.api';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { getAllBooks, getBookById } from '../api/book.api';
import { filteredBooks, setBooks } from '../store/slices/bookSlice';
import { MultipleSelectList } from 'react-native-dropdown-select-list';

import Button from '../Button/Button';
import { Rating } from '@kolking/react-native-rating';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome6Pro';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import CatalogStyles from './CatalogStyle';
// import Slider from '@react-native-community/slider';
// import { Slider } from 'react-native';
// import RangeSlider from 'react-native-range-slider'
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import Slider from 'rn-range-slider';
import { useNavigation } from '@react-navigation/native';
import { number } from 'yup';

type Props = {};

const Catalog: React.FC<Props> = () => {
  const navigation = useNavigation();
  const onBookDetailPage = (id: number) => {
    navigation.navigate('BookDetail', {id});
  };

  const bookList = useAppSelector(state => state.book.booksStore);
  

  const dispatch = useAppDispatch();


  const sortData = [1, 2, 3];

  const [genres, setGenres] = useState<{key: any, value: any}[]>();
  const [selectedGenres, setSelectedGenres] = useState([]);

  const fetchAllGenres = async () => {
    try {
      const response = await getAllGenres();
      const genresList = response.data.map(item => ({key: item.id, value: item.name}))
      setGenres(genresList)
    } catch (er) {
      console.log(er);
    }
  };

  const fetchAllBooks = async () => {
    try {
      const response = await getAllBooks();
      dispatch(setBooks(response.data));
    } catch (er) {
      console.log(er);
    }
  };
  
 const handleGenreSelection = () => {
  const genresFilter= selectedGenres.map((id: number) => (genres?.find(item => item.key===id)?.value))
  
  dispatch(filteredBooks({genresFilter}));

 console.log(genresFilter)
  };
  
  
  useEffect(() => {
    fetchAllBooks();
    fetchAllGenres();
  }, []);

  const onCartClick = () => {
    console.log('New rating:');
  }

  const [liked, setLiked] = useState(false);

  const handleLikePress = () => {
    setLiked(!liked);
  };



  const renderBookItem = ({ item }) => (
  <TouchableOpacity onPress={() => onBookDetailPage(item.id)}>
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
        <Image style={{ width: 135, minHeight: 192, borderRadius: 16 }} source={{ uri: item.image }} />
      </View>
      <Text style={CatalogStyles.text_title}>{item.title}</Text>
      <Text style={CatalogStyles.text_author}>{item.author}</Text>
      <View style={CatalogStyles.rating_container}>
        <Rating size={20} rating={item.overall_rating} fillColor={'#BFCC94'} />
        <Text style={CatalogStyles.rating_text}>{(item.overall_rating.toFixed(1))}</Text>
      </View>
      <Button style={CatalogStyles.price_button} text={`$${item.price} USD`} onPress={onCartClick} />
    </View>
    </TouchableOpacity>
  );

 

  // const [minPrice, setMinPrice] = useState(0);
  // const [maxPrice, setMaxPrice] = useState(100);

  // const handleMinPriceChange = (value) => {
  //   setMinPrice(value);
  // };

  // const handleMaxPriceChange = (value) => {
  //   setMaxPrice(value);
  // };

  const [rangeState, setRangeState] = useState([0, 100])
  // state = {
  //   values: [0, 100], // начальные значения для range slider
  // };

  const onValuesChange = (value: React.SetStateAction<number[]>) => {
    setRangeState(value);
  };


  return (
    <View style={CatalogStyles.catalog_container}>
      <Text style={CatalogStyles.catalog_title}>Catalog</Text>
      <View>
        <MultipleSelectList
          placeholder='Genre'
          setSelected={setSelectedGenres}
          onSelect={handleGenreSelection}
          search={false}
          boxStyles={CatalogStyles.box}
          dropdownStyles={CatalogStyles.dropdown}
          data={genres!}
        />
        <MultipleSelectList
          placeholder={`Sort by`}
          setSelected={handleGenreSelection}
          search={false}
          boxStyles={CatalogStyles.box}
          dropdownStyles={CatalogStyles.dropdown}
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
      <MultiSlider
        containerStyle={{ alignItems: 'center' }}
        values={rangeState}
        sliderLength={280} // длина слайдера
        min={0} // минимальное значение
        max={100} // максимальное значение
        step={1} // шаг изменения значения
        onValuesChange={onValuesChange} // обработчик изменения значений
        trackStyle={{ height: 12, backgroundColor: '#D6D8E7', borderRadius: 16 }}
        selectedStyle={{ backgroundColor: '#BFCC94' }}
        markerStyle={{ height: 32, width: 32, borderRadius: 16, backgroundColor: 'white', borderColor: '#BFCC94', borderWidth: 2 }}
      />
    </View>
  );
};

export default Catalog;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  sliderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  slider: {
    flex: 1,
    marginHorizontal: 5,
  },
  rangeText: {
    marginTop: 10,
    textAlign: 'center',
  },
});
