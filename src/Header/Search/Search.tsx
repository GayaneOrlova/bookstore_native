import React, { Dispatch, SetStateAction} from 'react';
import { View } from 'react-native';

import { useAppDispatch } from '../../store/hooks';

import Input from '../../Input/Input';
import searchStyles from './SearchStyles';

type Props = {
  searchValue: string,
  setSearchValue: Dispatch<SetStateAction<string>>;
};

const Search: React.FC<Props> = (props) => {
  const dispatch = useAppDispatch();

  const handleChange = (value: React.SetStateAction<string>) => {
    props.setSearchValue(value);
  }

  return (
    <View style={searchStyles.container}>
      <Input
        onChangeText={handleChange}
        defaultValue={props.searchValue}
        placeholder="Search"
        image_source={require('../../../images/icons/search.png')}
      />
    </View>
  );
};

export default Search;
