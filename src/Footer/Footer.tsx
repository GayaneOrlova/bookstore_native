import React from 'react';
import { View, TextInput, Image, Text } from 'react-native';
import FooterStyle from './FooterStyle';

const Footer = () => {

  return (
    <View style={FooterStyle.footer}>
      <View style={FooterStyle.footer_container}>
        <Image
          source={require('/Users/gayaneorlova/bookstore_native/images/icons/logo_footer.png')}
          style={FooterStyle.footer_logo}
        />

        <View style={FooterStyle.footer_contacts}>
          <Text style={FooterStyle.footer_text}>tranthuy.nute@gmail.com</Text>
          <Text style={FooterStyle.footer_text}>(480) 555-0103</Text>
        </View>
        <View style={FooterStyle.footer_navigation}>
          <Text style={FooterStyle.footer_text}>Home Page</Text>
          <Text style={FooterStyle.footer_text}>Catalog</Text>
          <Text style={FooterStyle.footer_text}>My Account</Text>
          <Text style={FooterStyle.footer_text}>Cart</Text>
        </View>

        <View>
          <Text style={FooterStyle.footer_text}>
            6391 Elgin St. Celina, Delaware{'\n'}10299
          </Text>
          <Image
            style={FooterStyle.footer_image}
            source={require('/Users/gayaneorlova/bookstore_native/images/map.png')}
          />
        </View>
      </View>

    </View>
  );
};

export default Footer;
