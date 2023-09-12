import React from 'react';
import {Image, Text, View} from 'react-native';
import HeaderStyles from './CatalogStyle';


type Props = {};

const Catalog: React.FC<Props> = () => {
  return (
    <View style={HeaderStyles.catalog_container}>
      <Text style={HeaderStyles.catalog_title}>Catalog</Text>
    </View>
  );
};

export default Catalog;
