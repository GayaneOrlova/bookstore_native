import React, { useEffect, useState } from 'react';
import { Image, Text, View } from 'react-native';
import HeaderStyles from './CatalogStyle';
import DropDownPicker from 'react-native-dropdown-picker';
import { getAllGenres } from '../api/genre.api';

type Props = {};

const Catalog: React.FC<Props> = () => {

  const [selectedGenre, setSelectedGenre] = useState(null);
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await getAllGenres();
        console.log(response.data);
      } catch (er) {
        console.error(er);
      }
    };

    fetchGenres();
  }, []);


  return (
    <View style={HeaderStyles.catalog_container}>
      <Text style={HeaderStyles.catalog_title}>Catalog</Text>
      <View>
        <DropDownPicker
          items={genres.map((genre) => ({ label: genre.name, value: genre.id }))}
          defaultValue={selectedGenre}
          placeholder="Genre"
          containerStyle={{ height: 40, width: 200 }}
          onChangeItem={(item) => setSelectedGenre(item.value)}
        />
      </View>
    </View>
  );
};

export default Catalog;