import React from 'react';
import { View, ScrollView } from 'react-native';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import InputPassword from './InputPassword/InputPassword';
import InputProfile from './InputProfile/InputProfile';
import userProfileStyles from './UserProfileStyles';

type Props = {}

const UserProfile: React.FC<Props> = () => {

  return (
    <ScrollView>
      <Header />
      <View style={userProfileStyles.container}>
        <InputProfile />
        <InputPassword text={{
          password: '',
          new_password: '',
          confirm_password: ''
        }} />
      </View>
      <Footer />
    </ScrollView>
  )

};

export default UserProfile;

