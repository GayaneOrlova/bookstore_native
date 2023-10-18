import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { View } from 'react-native';
import { getAllGenres } from '../../../api/book.api';
import { MultipleSelectList } from 'react-native-dropdown-select-list';
import { toast } from '../../../utils/utils';
import GenreFilterStyle from './GenreFilterStyle';

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
    } catch (er) {
      const errorText = Object.values(er.response.data)[0];
      toast(errorText)
    }
  };

  const handleGenreSelection = async () => {
    try {
      if (selectedGenres.length > 0) {
        const genresFilter = selectedGenres.map((id: number) => (genres?.find(item => item.key === id)?.value));
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
        boxStyles={GenreFilterStyle.box}
        inputStyles={GenreFilterStyle.selectTitle}
        checkBoxStyles={GenreFilterStyle.checkBox}
        dropdownStyles={GenreFilterStyle.dropdown}
        dropdownTextStyles={GenreFilterStyle.selectTitle}
        badgeStyles={GenreFilterStyle.badge}
      />
    </View>
  );
};

export default GenreFilter;
