import React from 'react';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import { useAppSelector } from './store/hooks';

import Header from './Header/Header';
import Banner from './Banner/Banner';
import Footer from './Footer/Footer';
import AuthorizeBanner from './Authorize/AuthorizeBanner';
import Catalog from './Catalog/Catalog';


const Homepage = () => {
  const isUser = useAppSelector(state => state.user.user);
  return (
    <View>
      <Catalog />
      {!isUser.email ? <AuthorizeBanner /> : null}
    </View>
  );
};

export default Homepage;
