import React, { useEffect, useState } from 'react';
import { FlatList, ListRenderItemInfo, Text, View } from 'react-native';
import { changeFavoriteById, getAllGenres, getBooksByGenre } from '../api/book.api';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { getPage } from '../api/book.api';
import { BookType, changeBookFavorite, setCurrentPage, setPagination } from '../store/slices/bookSlice';
import { MultipleSelectList } from 'react-native-dropdown-select-list';
import { SelectList } from 'react-native-dropdown-select-list'


import CatalogStyles from './CatalogStyle';
// import Slider from '@react-native-community/slider';
// import { Slider } from 'react-native';
// import RangeSlider from 'react-native-range-slider'
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import { useNavigation, useRoute } from '@react-navigation/native';
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
  const [queryString, setQueryString] = useState();
  const [sortString, setSortString] = useState();


  const onLikePress = async(id: number) => {
    try {
      const res = await changeFavoriteById(id);      
      dispatch(changeBookFavorite(id));
    }
    catch(er){
      const errorText = Object.values(er.response.data);
      toastic( errorText)
    }
  };


  // const sortData = {
  //   'Price': 'price',
  //   'Name': 'title',
  //   'Author': 'Author name',
  //   'Rating': 'overall_rating',
  //   'Data of issue': 'published_at'
  // };
  
  const sortData = ['price', 'author', 'overall_rating',];
  const { results: paginationResults, count } = useAppSelector((state) => state.book.pagination)
  const currentPage = useAppSelector((state) => state.book.currentPage)

  const changePageHandler = async (page: number) => {
    try {
      const responce = await getPage(page, queryString);
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
      setGenres(genresList)
    } catch (er) {
      const errorText = Object.values(er.response.data)[0];
      toastic(errorText)
    }
  };

  const handleGenreSelection = async () => {
    try {
      if (selectedGenres.length > 0) {
        const genresFilter = selectedGenres.map((id: number) => (genres?.find(item => item.key === id)?.value));
        const tempQueryString = "genre=" + genresFilter.join("&genre=");
        const responce = await getBooksByGenre(tempQueryString + (sortString ? '&ordering=' + sortString : ''));

        console.log('7777', tempQueryString + (sortString ? '&ordering=' + sortString : ''))
        dispatch(setPagination(responce.data));
        setQueryString(tempQueryString);
      }
    }
    catch (er) {
      console.log(er);
    }
  };

  const handleSortBooks = (sortData: string) => {
    setSortString(sortData);
    handleGenreSelection();
  }

  useEffect(() => {
    changePageHandler(currentPage);
  }, []);

  useEffect(() => {
    fetchAllGenres();
  }, []);


  const [rangeState, setRangeState] = useState([0, 100])
  const onValuesChange = (value: React.SetStateAction<number[]>) => {
    setRangeState(value);
  };

  const handlePageChange = (page: number) => {
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
          data={genres!}
          label='Selected genres:'
          boxStyles={CatalogStyles.box}
          inputStyles={CatalogStyles.selectTitle}
          checkBoxStyles={CatalogStyles.checkBox}
          dropdownStyles={CatalogStyles.dropdown}
          dropdownTextStyles={CatalogStyles.selectTitle}
          badgeStyles={CatalogStyles.badge}
        />
        <SelectList
          placeholder={`Sort by`}
          setSelected={handleSortBooks}
          data={sortData}
          maxHeight={666}
          search={false}
          boxStyles={CatalogStyles.box}
          inputStyles={CatalogStyles.selectTitle}
          dropdownStyles={CatalogStyles.dropdown}
          dropdownTextStyles={CatalogStyles.selectTitle}

          // onSelect={handleSortBooks}
          
        />
        <View style={CatalogStyles.catalogList}>
          {/* <ScrollView horizontal={true} style={{ flexGrow: 1, gap: 20 }}> */}
          <FlatList
            data={paginationResults}
            renderItem={({ item }: ListRenderItemInfo<BookType>) => (
              <RenderBookItem item={item} navigation={navigation} onFavoritePress={() => onLikePress(item.id)} />
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

