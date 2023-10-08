import React, { useEffect, useState } from 'react';
import { FlatList, Image, Modal, Text, TouchableOpacity, View } from "react-native";
import { ScrollView } from 'react-native-gesture-handler';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { changeCart, getCart } from '../api/book.api';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setCart } from '../store/slices/bookSlice';
import Button from '../Button/Button';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import CartStyles from './CartStyles';

type RootStackParamList = {
  Homepage: undefined;
};

type NavigationProps = StackNavigationProp<RootStackParamList>;

const Cart = () => {
  const navigation = useNavigation<NavigationProps>();
  const dispatch = useAppDispatch();
  const isUser = useAppSelector(state => state.user.user);
  const cartList = useAppSelector(state => state.book.cartStore);
  const [showModal, setShowModal] = useState(false);

  const onHomepage = () => {
    navigation.navigate('Homepage');
  };

  const fetchUserCart = async () => {
    if (!isUser.email) { return }
    try {
      const responce = await getCart();
      dispatch(setCart(responce.data));
    }
    catch (er) {
      console.log(er);
    }
  };

  useEffect(() => {
    fetchUserCart();
  }, [cartList]);

  const handleMinus = async (id: number) => {
    const currentCartItem = cartList.items.find(item => item.id === id);
    if (currentCartItem?.amount! < 0) { return; }

    const amount = currentCartItem?.amount! - 1;
    try {
      await changeCart(amount, id);
    }
    catch (er) {
      console.log(er);
    }
  };

  const handlePlus = async (id: number) => {
    const currentCartItem = cartList.items.find(item => item.id === id)
    const amount = currentCartItem?.amount! + 1;
    try {
      await changeCart(amount, id);
    }
    catch (er) {
      setShowModal(true);
      setTimeout(() => {
        setShowModal(false);
      }, 2000);
      console.log(er);
    }
  };

  const handleDeleteCart = async (id: number) => {
    const amount = 0;
    try {
      await changeCart(amount, id);
    }
    catch (er) {
      console.log(er);
    }
  };

  return (
    <ScrollView>
      <Header />
      {cartList?.total_price ? (
        <View style={CartStyles.cart_page}>
          <FlatList
            contentContainerStyle={CartStyles.cart_item}
            data={cartList.items}
            keyExtractor={(item) => item.id!.toString()}
            renderItem={({ item, index }) => (
              <View style={index === (cartList.items.length - 1) ? CartStyles.render_item_last : CartStyles.render_item}>
                <Image style={CartStyles.cart_item_image} source={{ uri: `${item.book_image}` }} />
                <View style={CartStyles.cart_item_detail}>
                  <Text style={CartStyles.cart_text}>{item.book_name}</Text>
                  <Text>{item.book_name}</Text>
                  <View style={CartStyles.amount_container}>
                    <TouchableOpacity onPress={() => handleMinus(item.id!)} style={CartStyles.amount_buttons}>
                      <Text style={CartStyles.amount_buttons_text}>-</Text>
                    </TouchableOpacity>
                    <Text style={[CartStyles.amount_buttons_text && CartStyles.amount_button_number]}>{item.amount}</Text>
                    <TouchableOpacity onPress={() => handlePlus(item.id!)} style={CartStyles.amount_buttons}>
                      <Text style={CartStyles.amount_buttons_text}>+</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleDeleteCart(item.id!)} style={CartStyles.delete_container}>
                      <Image
                        source={require('../../images/icons/delete.png')}
                        style={CartStyles.delete_icon}
                      />
                    </TouchableOpacity>
                  </View>
                  <Text style={CartStyles.item_price}>{`$${item.price} USD`}</Text>
                </View>
                <Modal visible={showModal} transparent>
                  <View style={CartStyles.modal}>
                    <View style={CartStyles.modal_text}>
                      <Text>Cannot add more books than available!</Text>
                    </View>
                  </View>
                </Modal>
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
