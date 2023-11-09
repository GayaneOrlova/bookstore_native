import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { View } from 'react-native';
import { MultipleSelectList } from 'react-native-dropdown-select-list';

import { getAllGenres } from '../../../../api/book.api';
import genreFilterStyle from './GenreFilterStyle';

import { toast } from '../../../../utils/utils';

type Props = {
  setGenreQueryString: Dispatch<SetStateAction<string>>;
};

const GenreFilter: React.FC<Props> = (props) => {
  const [genres, setGenres] = useState<{ key: any, value: any }[]>();
  const [selectedGenres, setSelectedGenres] = useState([]);

  const fetchAllGenres = async () => {
    try {
      const response = await getAllGenres();
      const genresList = response.data.map(item => ({ key: item.id, value: item.name }))
      setGenres(genresList)
    } catch (err: any) {
      const errorText = Object.values(err.response.data)[0];
      toast(errorText)
    }
  };

  const handleGenreSelection = async () => {
    try {
      if (selectedGenres.length > 0) {
      console.log('selectedGenres:', selectedGenres)
        const genresFilter = selectedGenres.map((id: number) => (genres?.find(item => item.key === id)?.value));
        console.log('genresFilter:', genresFilter)
        const genresString = "genre=" + genresFilter.join("&genre=");
        props.setGenreQueryString(genresString);
      }
      else {
        props.setGenreQueryString('');
      }
    }
    catch (er) {
      console.log(er);
    }
  };

  useEffect(() => {
    fetchAllGenres();
  }, []);


  return (
    <View>
      <MultipleSelectList
        placeholder='Genre'
        setSelected={setSelectedGenres}
        onSelect={handleGenreSelection}
        search={false}
        data={genres!}
        label='Selected genres:'
        boxStyles={genreFilterStyle.box}
        inputStyles={genreFilterStyle.selectTitle}
        checkBoxStyles={genreFilterStyle.checkBox}
        dropdownStyles={genreFilterStyle.dropdown}
        dropdownTextStyles={genreFilterStyle.selectTitle}
        badgeStyles={genreFilterStyle.badge}
      />
    </View>
  );
};

export default GenreFilter;
