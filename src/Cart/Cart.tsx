import React from 'react';
import { Image, Text, View } from "react-native";
import CartStyles from './CartStyles';
import Button from '../Button/Button';
import { useNavigation } from '@react-navigation/native';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { ScrollView } from 'react-native-gesture-handler';

const Cart = () => {
  const navigation = useNavigation();
  const onHomepage = () => {
    navigation.navigate('Homepage');
  };

  return (
    // сделать условие по отрисовки корзины, если есть товары
    <ScrollView>
      <Header />
      <View style={CartStyles.cart_container}>
        <Text style={CartStyles.cart_text}>Your cart is empty</Text>
        <Text style={CartStyles.cart_text_description}>Add items to cart to make a purchase.Go to the catalogue no.</Text>
        <Button
          text="Go to catalog"
          style={CartStyles.cart_button}
          onPress={onHomepage}
        />
        <Image
          style={CartStyles.cart_image}
          source={require('../../images/books.png')}
        />
      </View>
      <Footer />
    </ScrollView>
  );
};

export default Cart;
