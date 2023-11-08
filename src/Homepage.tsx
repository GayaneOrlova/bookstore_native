import React from 'react';
import { View } from 'react-native';

import { useAppSelector } from './store/hooks';

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
