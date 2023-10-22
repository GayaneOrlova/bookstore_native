import React, { useEffect, useState } from 'react';
import { FlatList, ListRenderItemInfo, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { changeFavoriteById, getPage } from '../api/book.api';
import { useAppDispatch, useAppSelector } from '../store/hooks';

import { BookType, changeBookFavorite, changeFavoriteList, setCurrentPage, setPagination } from '../store/slices/bookSlice';
import RenderBookItem from '../RenderBookItem/RenderBookItem';
import Pagination from '../Pagination/Pagination';
import RangeSlider from './Sort&Filters/PriceRangeSlider/PriceRangeSlider';
import GenreFilter from './Sort&Filters/GenreFilter/GenreFilter';
import SortByOptions from './Sort&Filters/SortByOptions/SortByOptions';

import catalogStyles from './CatalogStyle';

import { toast } from '../utils/utils';
import { number } from 'yup';

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
  
  console.log('paginationResults', paginationResults.length)
  const [rangeState, setRangeState] = useState([0, 100])
  const [genreQueryString, setGenreQueryString] = useState('');
  const [sortString, setSortString] = useState('');
  const [queryParams, setQueryParams] = useState('');

console.log(count, 'count')
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
    catch (err: any) {
      const errorText = Object.values(err.response.data);
      toast(errorText)
    }
  };


  useEffect(() => {
    changePageHandler(currentPage);
  }, [genreQueryString, sortString, rangeState, queryParams]);

  return (
    <View style={catalogStyles.catalog_container}>
      <Text style={catalogStyles.catalog_title}>Catalog</Text>
      <View>
        <GenreFilter setGenreQueryString={setGenreQueryString} />
        <RangeSlider rangeState={rangeState} setRangeState={setRangeState} rangeStateMin={rangeState[0]} rangeStateMax={rangeState[1]} />
        <SortByOptions setSortString={setSortString} />
        <View style={catalogStyles.catalogList}>
          <FlatList
            data={paginationResults}
            renderItem={({ item }: ListRenderItemInfo<BookType>) => (
              <RenderBookItem item={item} navigation={navigation} onFavoritePress={() => onLikePress(item.id)} />
            )}
            keyExtractor={(item) => item.author}
            numColumns={2}
            contentContainerStyle={catalogStyles.content_container}
            columnWrapperStyle={catalogStyles.column_wrapper}
          />
        </View>
        
        <Pagination totalPages={count} currentPage={currentPage} onPageChange={changePageHandler} count={count} paginationResults={paginationResults} />
      </View>
    </View>
  );
};

export default Catalog;
