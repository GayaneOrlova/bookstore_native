import React from 'react';
import {Image, Text, View} from 'react-native';
import BannerStyles from './BannerStyles';
import Button from '../Button/Button';

type Props = {};

const Banner: React.FC<Props> = () => {
  return (
    <View style={BannerStyles.container}>
      <Image
        style={BannerStyles.background_image}
        source={require('images/books.png')}
      />
      <View style={BannerStyles.text_group}>
        <Text style={BannerStyles.text_group_title}>
          Build your library with us
        </Text>
        <Text style={BannerStyles.text_group_description}>
          Buy two books and get one for {'\n'}free
        </Text>
        <Button text="Choose a book" style={BannerStyles.text_group_button} />
      </View>
      <Image
        style={BannerStyles.woman_image}
        source={require('images/woman-reader.png')}
      />
    </View>
  );
};

export default Banner;
