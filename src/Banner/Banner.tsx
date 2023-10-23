import React from 'react';
import {Image, Text, View} from 'react-native';

import bannerStyles from './BannerStyles';
import Button from '../Button/Button';
import { ScrollView } from 'react-native-gesture-handler';

type Props = {};

const Banner: React.FC<Props> = () => {
  return (
    <View style={bannerStyles.container}>
      <Image
        style={bannerStyles.background_image}
        source={require('../../images/books.png')}
      />
      <View style={bannerStyles.text_group}>
        <Text style={bannerStyles.text_group_title}>
          Build your library with us
        </Text>
        <Text style={bannerStyles.text_group_description}>
          Buy two books and get one for {'\n'}free
        </Text>
        <Button text="Choose a book" style={bannerStyles.text_group_button} />
      </View>
      <Image
        style={bannerStyles.woman_image}
        source={require('../../images/woman-reader.png')}
      />
    </View>
  );
};

export default Banner;
