import React from 'react';
import { View, ScrollView } from 'react-native';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import UserPasswordChange from './UserPasswordChange/UserPasswordChange';
import UserPersonalInfo from './UserPersonalInfo/UserPersonalInfo';
import userProfileStyles from './UserProfileStyles';

type Props = {}

const UserProfile: React.FC<Props> = () => {

  return (
    <ScrollView>
      <Header />
      <View style={userProfileStyles.container}>
        <UserPersonalInfo />
        <UserPasswordChange />
      </View>
      <Footer />
    </ScrollView>
  )

};

export default UserProfile;

