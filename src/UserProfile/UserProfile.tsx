import React from 'react';
import { View, ScrollView } from 'react-native';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import UserProfileStyles from './UserProfileStyles';
import InputPassword from './InputPassword/InputPassword';
import InputProfile from './InputProfile/InputProfile';



const UserProfile = () => {

  return (
    <ScrollView>
      <Header />
      <View style={UserProfileStyles.container}>
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

