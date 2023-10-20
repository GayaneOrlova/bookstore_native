import React, { ChangeEvent, useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { View } from 'react-native';
import { useDebounce } from 'usehooks-ts'

import Input from '../../Input/Input';
import SearchStyles from './SearchStyles';
import { getPage } from '../../api/book.api';
import { setCurrentPage, setPagination } from '../../store/slices/bookSlice';
import { useAppDispatch } from '../../store/hooks';

const Search = () => {
  const dispatch = useAppDispatch();

  const [value, setValue] = useState<string>('')
  const debouncedValue = useDebounce<string>(value, 2000)
  console.log(value)

  const handleChange = (value: React.SetStateAction<string>) => {
    setValue(value);
  }

  useEffect(() => {
    (
      async (page = 1) => {
        try {
          const responce = await getPage(page, `search=${debouncedValue}`);
          console.log('!!!!', debouncedValue)
          dispatch(setPagination(responce.data));
        } catch (er) {
          console.log(er);
        };
      })()
  }, [debouncedValue]);


  return (
    <View style={SearchStyles.container}>
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
