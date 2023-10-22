import React, { useEffect, useState } from 'react';
import DotsPagination from 'react-native-dots-pagination';
import { View, TouchableOpacity, Image } from 'react-native';

import paginationStyle from './PaginationStyle';
import { COLORS } from '../utils/colors';
import { BookType } from '../store/slices/bookSlice';

type Props = {
  totalPages: number,
  currentPage: number,
  count: number,
  paginationResults: BookType[],
  onPageChange: (value: any) => void;
};

const Pagination: React.FC<Props> = (props) => {
  const [dotCount, setDotCount] = useState<number>(0);
  
  useEffect (() => {
    if (props.paginationResults?.length > 0) {
      setDotCount(Math.ceil(props.count / props.paginationResults.length));
     };
  }, [props.paginationResults]);
  

  const handlePageChange = (page: number) => {
    props.onPageChange(page);
  };

  return (
    <View style={paginationStyle.container}>
      <TouchableOpacity onPress={() => handlePageChange(props.currentPage - 1)} disabled={props.currentPage === 1}>
        <Image source={require('../../images/icons/back.png')} />
      </TouchableOpacity>
      <DotsPagination
        length={dotCount}
        passiveDotWidth={14}
        passiveDotHeight={14}
        activeDotWidth={14}
        activeDotHeight={14}
        active={props.currentPage - 1}
        activeColor={COLORS.dark}
        passiveColor={'gray'}
        marginHorizontal={30}
      />
      <TouchableOpacity onPress={() => handlePageChange(props.currentPage + 1)} disabled={props.currentPage === props.totalPages}>
        <Image source={require('../../images/icons/forward.png')} />
      </TouchableOpacity>
    </View>
  );
};


export default Pagination;
