import React, { useEffect, useState } from 'react';
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { ScrollView } from 'react-native-gesture-handler';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { getCart } from '../api/book.api';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { CartType, setCart } from '../store/slices/bookSlice';
import Button from '../Button/Button';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import CartStyles from './CartStyles';
import { toastic } from '../utils/utils';
import CartQuantitySelector from '../CartQuantitySelector/CartAmountSelector';

type RootStackParamList = {
  Homepage: undefined;
};

type NavigationProps = StackNavigationProp<RootStackParamList>;

const Cart = () => {
  const navigation = useNavigation<NavigationProps>();
  const dispatch = useAppDispatch();
  const isUser = useAppSelector(state => state.user.user);
  const cartList = useAppSelector(state => state.book.cartStore);
  const [usercart, setUsercart] = useState<CartType>();

  const onHomepage = () => {
    navigation.navigate('Homepage');
  };

  const fetchUserCart = async () => {
    if (!isUser.email) { return }
    try {
      const responce = await getCart();
      dispatch(setCart(responce.data));
      setUsercart(responce.data);
    }
    catch (er) {
      const errorText = Object.values(er.response.data)[0];
      toastic(errorText);
    }
  };

  useEffect(() => {
    fetchUserCart();
  }, [usercart]);


  return (
    <ScrollView>
      <Header />
      {cartList?.total_price ? (
        <View style={CartStyles.cart_page}>
          <FlatList
            contentContainerStyle={CartStyles.cart_item}
            data={cartList.items}
            keyExtractor={(item) => item.book_name}
            renderItem={({ item, index }) => (
              <View style={index === (cartList.items.length - 1) ? CartStyles.render_item_last : CartStyles.render_item}>
                <Image style={CartStyles.cart_item_image} source={{ uri: `${item.book_image}` }} />
                <View style={CartStyles.cart_item_detail}>
                  <View style={CartStyles.cart_texts}>
                    <Text style={CartStyles.cart_text}>{item.book_name}</Text>
                    <Text>{item.book_author}</Text>
                  </View>
                  <CartQuantitySelector id={item.id} amount={item!.amount} />
                  <Text style={CartStyles.item_price}>{`$${item.price} USD`}</Text>
                </View>
              </View>
            )}
          />
          <Text style={CartStyles.total_text}>Total: <Text style={CartStyles.total_text}>{cartList.total_price}</Text></Text>
          <TouchableOpacity style={CartStyles.continue_button}>
            <Text>Continue shopping</Text>
          </TouchableOpacity>
          <Button
            text="Chekout"
            style={CartStyles.cart_button}
          />
        </View>
      ) : (
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
      )
      }
      <Footer />
    </ScrollView >
  );
};

export default Cart;
