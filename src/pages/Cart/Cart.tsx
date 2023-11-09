import React, { useEffect } from 'react';
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

import { isAxiosError } from 'axios';

import { getCart } from '../../api/book.api';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setCart } from '../../store/slices/bookSlice';

import Button from '../Button/Button';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import CartQuantitySelector from '../CartQuantitySelector/CartQuantitySelector';
import EmptyCart from './EmptyCart/EmptyCart';
import cartStyles from './CartStyles';

import { toast } from '../../utils/utils';

type Props = {}
type RootStackParamList = {
  Homepage: undefined;
};
type NavigationProps = StackNavigationProp<RootStackParamList>;

const Cart: React.FC<Props> = () => {
  const navigation = useNavigation<NavigationProps>();
  const dispatch = useAppDispatch();
  const isUser = useAppSelector(state => state.user.user);
  const cartList = useAppSelector(state => state.book.cartStore);

  const onHomepage = () => {
    navigation.navigate('Homepage');
  };

  const fetchUserCart = async () => {
    if (!isUser.email) { return }
    try {
      const responce = await getCart();
      dispatch(setCart(responce.data));
    }
    catch (err: any) {
      if (isAxiosError(err)) {
        const errorText = Object.values(err.response?.data)[0];
        toast(errorText);
      }
      else {
        toast('An error was occured!');
      }
    }
  };

  useEffect(() => {
    fetchUserCart();
  }, []);

console.log('cartList?.total_price', cartList?.total_price)
console.log('cartList', cartList)

  return (
    <View>
      {cartList?.total_price ? (
        <View>
          <FlatList
            contentContainerStyle={cartStyles.cart_item}
            data={cartList.items}
            keyExtractor={(item) => item.book_name}
            renderItem={({ item, index }) => (
              <View style={index === (cartList.items.length - 1) ? cartStyles.render_item_last : cartStyles.render_item}>
                <Image style={cartStyles.cart_item_image} source={{ uri: `${item.book_image}` }} />
                <View style={cartStyles.cart_item_detail}>
                  <View style={cartStyles.cart_texts}>
                    <Text style={cartStyles.cart_text}>{item.book_name}</Text>
                    <Text>{item.book_author}</Text>
                  </View>
                  <CartQuantitySelector id={item.id} amount={item!.amount} />
                  <Text style={cartStyles.item_price}>{`$${item.price} USD`}</Text>
                </View>
              </View>
            )}
            ListHeaderComponent={<Header />}
            ListFooterComponent={
              <View>
                <Text style={cartStyles.total_text}>Total: <Text style={cartStyles.total_text}>{cartList.total_price}</Text></Text>
                <TouchableOpacity style={cartStyles.continue_button}>
                  <Text>Continue shopping</Text>
                </TouchableOpacity>
                <Button
                  text="Chekout"
                  style={cartStyles.cart_button}
                />
                <Footer />
              </View>}
          />
        </View>
      ) : (
      <EmptyCart />
      )}
    </View>
  );
};

export default Cart;
