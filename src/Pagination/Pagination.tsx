import React from 'react';
import DotsPagination from 'react-native-dots-pagination';
import { View, TouchableOpacity, Image } from 'react-native';

import paginationStyle from './PaginationStyle';

type Props = {
  totalPages: number,
  currentPage: number,
  count: number,
  onPageChange: (value: any) => void;
};

const Pagination: React.FC<Props> = (props) => {
  const dotCount = Math.ceil(props.count / 2);
  
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
        activeColor={'#0D1821'}
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
