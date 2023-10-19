import React, { Dispatch, SetStateAction } from 'react';
import { View } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';

import sortByOptionsStyle from './SortByOptionsStyle';

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
        boxStyles={sortByOptionsStyle.box}
        inputStyles={sortByOptionsStyle.selectTitle}
        dropdownStyles={sortByOptionsStyle.dropdown}
        dropdownTextStyles={sortByOptionsStyle.selectTitle}
      />
    </View>
  );
};

export default SortByOptions;
