import React from 'react';
import {useForm, Controller} from 'react-hook-form';
import {View, TextInput, Image} from 'react-native';
import SearchStyles from './SearchStyles';

const Search = () => {
  const {control, handleSubmit} = useForm();

  const onSubmit = data => {
    console.log(data);
  };
  return (
    <View style={SearchStyles.container}>
      <Controller
        control={control}
        render={({field: {onChange, onBlur, value}}) => (
          <View style={SearchStyles.input}>
            <Image
              source={require('images/icons/search.png')}
              style={SearchStyles.search_icon}
            />
            <TextInput
              style={SearchStyles.text_input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Search"
            />
          </View>
        )}
        name="searchText"
        defaultValue=""
      />
    </View>
  );
};

export default Search;
