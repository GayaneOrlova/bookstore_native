import React from 'react';
import Header from './Header/Header';
import Banner from './Banner/Banner';
import { ScrollView } from 'react-native';
import Footer from './Footer/Footer';

const Homepage = () => {
  return (
    <ScrollView>
      <Header />
      <Banner />
      <Footer />
    </ScrollView>
  );
};

export default Homepage;
