import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Image, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { useAppDispatch, useAppSelector } from '../store/hooks';
import { logout } from '../store/slices/userSlice';

import footerStyle from './FooterStyle';

type Props = {}

const Footer: React.FC<Props> = () => {
  const dispatch = useAppDispatch()
  const isUser = useAppSelector(state => state.user.user);
  const onLogout = () => {
    dispatch(logout());
    AsyncStorage.removeItem('access');
  };

  return (
    <View style={footerStyle.footer}>
      <View style={footerStyle.footer_container}>
        <Image
          source={require('../../images/icons/logo_footer.png')}
          style={footerStyle.footer_logo}
        />
        <View style={footerStyle.footer_contacts}>
          <Text style={footerStyle.footer_text}>tranthuy.nute@gmail.com</Text>
          <Text style={footerStyle.footer_text}>(480) 555-0103</Text>
        </View>
        <View style={footerStyle.footer_navigation}>
          <Text style={footerStyle.footer_text}>Home Page</Text>
          <Text style={footerStyle.footer_text}>Catalog</Text>
          <Text style={footerStyle.footer_text}>My Account</Text>
          <Text style={footerStyle.footer_text}>Cart</Text>
          {isUser.email ? (
            <TouchableOpacity
              onPress={onLogout}>
              <Text style={footerStyle.footer_text}>LOGOUT</Text>
            </TouchableOpacity>
          ) : null
          }
        </View>
        <View>
          <Text style={footerStyle.footer_text}>
            6391 Elgin St. Celina, Delaware{'\n'}10299
          </Text>
          <Image
            style={footerStyle.footer_image}
            source={require('../../images/map.png')}
          />
        </View>
      </View>
    </View>
  );
};

export default Footer;
