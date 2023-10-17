import React from 'react';
import DotsPagination from 'react-native-dots-pagination';
import { View, TouchableOpacity, Text, Image } from 'react-native';
import PaginationStyle from './PaginationStyle';

type Props = {
  totalPages: number,
  currentPage: number,
  count: number,
  onPageChange: (value: any) => void;
};

const Pagination: React.FC<Props> = ({ totalPages, currentPage, count, onPageChange }) => {
  const dotCount = Math.ceil(count / 2);
  const handlePageChange = (page: number) => {
    onPageChange(page);
  };


  return (
    <View style={PaginationStyle.container}>
      <TouchableOpacity onPress={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
      <Image source={require('../../images/icons/back.png')}/>
    </TouchableOpacity>
      <DotsPagination
        length={dotCount}
        passiveDotWidth={14}
        passiveDotHeight={14}
        activeDotWidth={14}
        activeDotHeight={14}
        active={currentPage - 1}
        activeColor={'#0D1821'}
        passiveColor={'gray'}
        marginHorizontal={30}
      />
      <TouchableOpacity onPress={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
      <Image source={require('../../images/icons/forward.png')}/>
      </TouchableOpacity>
    </View>
  );
};

export default Pagination;
