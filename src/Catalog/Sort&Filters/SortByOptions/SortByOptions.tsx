import React, { Dispatch, SetStateAction, useState } from 'react';
import { Text, View } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';
import SortByOptionsStyle from './SortByOptionsStyle';

type Props = {
  setSortString: Dispatch<SetStateAction<string>>;
};

const SortByOptions: React.FC<Props> = (props) => {
  const sortData = ['Price', 'Name', 'Author', 'Rating', 'Data of issue',];

  const sortDataKeys = {
    'Price': 'price',
    'Name': 'title',
    'Author': 'author',
    'Rating': 'overall_rating',
    'Data of issue': 'published_at',
  };

  const handleSortBooks = (sortDataValue: string) => {
    const keySort = sortDataKeys[sortDataValue];
    props.setSortString(keySort);
  }

  return (
    <View>
      <SelectList
        placeholder={`Sort by`}
        setSelected={handleSortBooks}
        data={sortData}
        maxHeight={666}
        search={false}
        boxStyles={SortByOptionsStyle.box}
        inputStyles={SortByOptionsStyle.selectTitle}
        dropdownStyles={SortByOptionsStyle.dropdown}
        dropdownTextStyles={SortByOptionsStyle.selectTitle}
      />
    </View>
  );
};

export default SortByOptions;
