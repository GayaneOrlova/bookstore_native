import React from 'react';
import { ScrollView } from 'react-native';

import Header from './Header/Header';
import Banner from './Banner/Banner';
import Footer from './Footer/Footer';
import AuthorizeBanner from './Authorize/AuthorizeBanner';

const Homepage = () => {
  return (
    <ScrollView>
      <Header />
      <Banner />
      <AuthorizeBanner />
      <Footer />
    </ScrollView>
  );
};

export default Homepage;
