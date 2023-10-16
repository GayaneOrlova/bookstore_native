import React, { useEffect, useState } from 'react';
import { FlatList, ListRenderItemInfo, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { getAllGenres, getGenre } from '../api/book.api';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { getPage} from '../api/book.api';
import { BookType, filteredBooks, setCurrentPage, setPagination } from '../store/slices/bookSlice';
import { MultipleSelectList } from 'react-native-dropdown-select-list';
import { SelectList } from 'react-native-dropdown-select-list'
import { useParams } from 'react-router-native';


import CatalogStyles from './CatalogStyle';
// import Slider from '@react-native-community/slider';
// import { Slider } from 'react-native';
// import RangeSlider from 'react-native-range-slider'
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import Slider from 'rn-range-slider';
import { useNavigation } from '@react-navigation/native';
import { number } from 'yup';

import { StackNavigationProp } from '@react-navigation/stack';
import RenderBookItem from '../RenderBookItem/RenderBookItem';
import { toastic } from '../utils/utils';
import Pagination from '../Pagination/Pagination';


type Props = {};

type RootStackParamList = {
  BookDetail: { id: number }
};

type NavigationProps = StackNavigationProp<RootStackParamList>;

const Catalog: React.FC<Props> = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<NavigationProps>();
  const isUser = useAppSelector(state => state.user.user);
  const [genres, setGenres] = useState<{ key: any, value: any }[]>();
  const [selectedGenres, setSelectedGenres] = useState([]);
  
  // const sortData = ['Price', 'Author name', 'Rating', 'Date of issue'];

  const { results: paginationResults, count } = useAppSelector((state) => state.book.pagination)
  const currentPage = useAppSelector((state) => state.book.currentPage)
  
  const changePageHandler = async (page: number) => {
    try {
      const responce = await getPage(page);
      dispatch(setCurrentPage(page));
      dispatch(setPagination(responce.data));
    } catch (er) {
      console.log(er);
    }
  }

  const fetchAllGenres = async () => {
    try {
      const response = await getAllGenres();
      const genresList = response.data.map(item => ({ key: item.id, value: item.name }))
      console.log(genresList, 'genresList')
      setGenres(genresList)
    } catch (er) {
      const errorText = Object.values(er.response.data)[0];
      toastic(errorText)
    }
  };
  
  
  
  // getGenre
  
  
  // const handleGenreSelection = async () => {
  //   try {
  //     const genresList = response.data.map(item => ({ key: item.id, value: item.name }))
  //     setGenres(genresList)
      
  //   } catch (er) {
  //     const errorText = Object.values(er.response.data)[0];
  //     toastic(errorText)
  //   }
  // };
  

  const handleGenreSelection = () => {
    // if (selectedGenres.length > 0) {
    //   const genresFilter = selectedGenres.map((id: number) => (genres?.find(item => item.key === id)?.value))
    //   // dispatch(filteredBooks({ genresFilter }));
    // } else {
    //   // fetchAllBooks();
    //   console.log('lalala')
    // }
  };

  const handleSortBooks = () => {
}



  useEffect(() => {
    changePageHandler(currentPage);
  }, [isUser.email]);

  useEffect(() => {
    // fetchAllBooks();
    fetchAllGenres();
  }, []);


  const [rangeState, setRangeState] = useState([0, 100])
  const onValuesChange = (value: React.SetStateAction<number[]>) => {
    setRangeState(value);
  };

  const handlePageChange = (page:number) => {
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
        {/* <SelectList
          placeholder={`Sort by`}
          setSelected={sortBooks}
          search={false}
          boxStyles={CatalogStyles.box}
          dropdownStyles={CatalogStyles.dropdown}
          data={sortData}
          maxHeight={666}
        /> */}
        <View>
          {/* <ScrollView horizontal={true} style={{ flexGrow: 1, gap: 20 }}> */}
          <FlatList
            data={paginationResults}
            renderItem={({ item }: ListRenderItemInfo<BookType>) => (
              <RenderBookItem item={item} navigation={navigation} />
            )}
            keyExtractor={(item) => item.author}
            numColumns={2}
            contentContainerStyle={CatalogStyles.content_container}
            columnWrapperStyle={CatalogStyles.column_wrapper}
          />
          {/* </ScrollView> */}
        </View>
        <Pagination totalPages={count} currentPage={currentPage} onPageChange={changePageHandler} count={count} />

      </View>
      <MultiSlider
        containerStyle={{ alignItems: 'center' }}
        values={rangeState}
        sliderLength={280}
        min={0}
        max={100}
        step={1}
        onValuesChange={onValuesChange}
        trackStyle={{ height: 12, backgroundColor: '#D6D8E7', borderRadius: 16 }}
        selectedStyle={{ backgroundColor: '#BFCC94' }}
        markerStyle={{ height: 32, width: 32, borderRadius: 16, backgroundColor: 'white', borderColor: '#BFCC94', borderWidth: 2 }}
      />
    </View>
  );
};

export default Catalog;

