import React, { useEffect, useState } from 'react';
import { FlatList, ListRenderItemInfo, Text, View } from 'react-native';
import { changeFavoriteById } from '../api/book.api';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { getPage } from '../api/book.api';
import { BookType, changeBookFavorite, setCurrentPage, setPagination } from '../store/slices/bookSlice';
import CatalogStyles from './CatalogStyle';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import RenderBookItem from '../RenderBookItem/RenderBookItem';
import { toastic } from '../utils/utils';
import Pagination from '../Pagination/Pagination';
import RangeSlider from './Sort&Filters/PriceRangeSlider/PriceRangeSlider';
import GenreFilter from './Sort&Filters/GenreFilter/GenreFilter';
import SortByOptions from './Sort&Filters/SortByOptions/SortByOptions';


type Props = {};

type RootStackParamList = {
  BookDetail: { id: number }
};

type NavigationProps = StackNavigationProp<RootStackParamList>;

const Catalog: React.FC<Props> = () => {
  const navigation = useNavigation<NavigationProps>();
  const { results: paginationResults, count } = useAppSelector((state) => state.book.pagination)
  const currentPage = useAppSelector((state) => state.book.currentPage)
  const dispatch = useAppDispatch();

  const [rangeState, setRangeState] = useState([0, 100])
  const [genreQueryString, setGenreQueryString] = useState('');
  const [sortString, setSortString] = useState('');
  const [queryParams, setQueryParams] = useState('');

  const changePageHandler = async (page: number) => {
    try {
      setQueryParams(genreQueryString + (sortString ? '&ordering=' + sortString : '') + (rangeState.length === 2 ? `&min_price=${rangeState[0]}&max_price=${rangeState[1]}` : ''))
      const responce = await getPage(page, queryParams);
      dispatch(setPagination(responce.data));
      dispatch(setCurrentPage(page));
    } catch (er) {
      console.log(er);
    }
  };

  const onLikePress = async (id: number) => {
    try {
      const res = await changeFavoriteById(id);
      dispatch(changeBookFavorite(id));
    }
    catch (er) {
      const errorText = Object.values(er.response.data);
      toastic(errorText)
    }
  };


  useEffect(() => {
    changePageHandler(currentPage);
  }, [genreQueryString, sortString, rangeState, queryParams]);

  return (
    <View style={CatalogStyles.catalog_container}>
      <Text style={CatalogStyles.catalog_title}>Catalog</Text>
      <View>
        <GenreFilter setGenreQueryString={setGenreQueryString} />

        <RangeSlider rangeState={rangeState} setRangeState={setRangeState} rangeStateMin={rangeState[0]} rangeStateMax={rangeState[1]} />
        <SortByOptions setSortString={setSortString} />
        <View style={CatalogStyles.catalogList}>
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
        </View>
        <Pagination totalPages={count} currentPage={currentPage} onPageChange={changePageHandler} count={count} />

      </View>
    </View>
  );
};

export default Catalog;
