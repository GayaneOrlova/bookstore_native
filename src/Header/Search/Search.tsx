import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { View, TextInput, Image } from 'react-native';
import SearchStyles from './SearchStyles';
import Input from '../../Input/Input';

const Search = () => {
  const { control, handleSubmit } = useForm();

  return (
    <View style={SearchStyles.container}>
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <Input
            onChangeText={onChange}
            defaultValue={value}
            placeholder="Search"
            image_source={require('../../../images/icons/search.png')}
          />
        )}
        name="search text"
      />
    </View>
  );
};

export default Search;
