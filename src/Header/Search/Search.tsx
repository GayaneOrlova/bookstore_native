import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { useDebounce } from 'usehooks-ts'

import { getPage } from '../../api/book.api';
import { setPagination } from '../../store/slices/bookSlice';
import { useAppDispatch } from '../../store/hooks';

import Input from '../../Input/Input';
import searchStyles from './SearchStyles';

type Props = {};

const Search: React.FC<Props> = () => {
  const dispatch = useAppDispatch();

  const [value, setValue] = useState<string>('')
  const debouncedValue = useDebounce<string>(value, 2000)

  const handleChange = (value: React.SetStateAction<string>) => {
    setValue(value);
  }

  useEffect(() => {
    (async (page = 1) => {
      try {
        const responce = await getPage(page, `search=${debouncedValue}`);
        dispatch(setPagination(responce.data));
      } catch (er) {
        console.log(er);
      };
    })()
  }, [debouncedValue]);


  return (
    <View style={searchStyles.container}>
      <Input
        onChangeText={handleChange}
        defaultValue={value}
        placeholder="Search"
        image_source={require('../../../images/icons/search.png')}
      />
    </View>
  );
};

export default Search;
