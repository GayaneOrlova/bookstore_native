import React from 'react';
import { ScrollView } from 'react-native';

import { useAppSelector } from './store/hooks';
import Header from './Header/Header';
import Banner from './Banner/Banner';
import Footer from './Footer/Footer';
import AuthorizeBanner from './Authorize/AuthorizeBanner';


const Homepage = () => {
  const isUser = useAppSelector(state => state.user.user);

  return (
    <ScrollView>
      <Header />
      <Banner />
      {!isUser ? <AuthorizeBanner /> : null }
      <Footer />
    </ScrollView>
  );
};

export default Homepage;
