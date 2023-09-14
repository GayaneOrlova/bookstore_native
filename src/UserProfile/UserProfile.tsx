import React, { useState } from 'react';
import { Controller, useForm } from "react-hook-form";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Image, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import Header from '../Header/Header';
import Input from '../Input/Input';
import Footer from '../Footer/Footer';
import UserProfileStyles from './UserProfileStyles';
import { useAppSelector } from '../store/hooks';
import Button from '../Button/Button';
import { userPasswordChange } from '../api/user.api/user.api';
import { setNewPassword } from '../store/slices/userSlice';
import InputPassword from './InputPassword/InputPassword';
import InputProfile from './InputProfile/InputProfile';

const UserProfile = () => {

  return (
    <ScrollView>
      <Header />
      <View style={UserProfileStyles.container}>
      <InputProfile />
      <InputPassword /></View>
      <Footer />
    </ScrollView>
  )

};

export default UserProfile;

