import React, { useEffect, useState } from 'react';
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import CartStyles from './CartStyles';
import Button from '../Button/Button';
import { useNavigation } from '@react-navigation/native';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { ScrollView } from 'react-native-gesture-handler';
import { StackNavigationProp } from '@react-navigation/stack';
import { getCart } from '../api/book.api';
import { useAppSelector } from '../store/hooks';
import { CartType } from '../store/slices/bookSlice';

type RootStackParamList = {
  Login: undefined;
  Signup: undefined;
  UserProfile: undefined;
  Cart: undefined;
  Homepage: undefined;
};

type NavigationProps = StackNavigationProp<RootStackParamList>;

const Cart = () => {
  const isUser = useAppSelector(state => state.user.user);

  const [userCart, setUserCart] = useState<CartType>();

  const navigation = useNavigation<NavigationProps>();
  const onHomepage = () => {
    navigation.navigate('Homepage');
  };

  const fetchUserCart = async () => {
    if (!isUser.email) { return }
    try {
      const responce = await getCart();
      setUserCart(responce.data);
    }
    catch (er) {
      console.log(er);
    }
  };
  useEffect(() => {
    fetchUserCart();
  }, [])


  const [amount, setAmount] = useState(0);

  const handleMinus = () => {
    if (amount > 0) {
      setAmount(amount - 1);
    }
  };

  const handlePlus = () => {
    setAmount(amount + 1);
  };

  const handleAddToCart = () => {
  };




  return (
    // сделать условие по отрисовки корзины, если есть товары
    <ScrollView>
      <Header />
      {userCart?.total_price ? (
        <View style={{ marginHorizontal: 15, marginTop: 30, marginBottom: 80 }}>
          <FlatList
            contentContainerStyle={CartStyles.cart_item}
            data={userCart.items}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={CartStyles.render_item}>
                <Image source={{ uri: `http://127.0.0.1:8000/media/books/2023/10/05/Narnia.png` }} style={CartStyles.cart_item_image} />
                <View style={CartStyles.cart_item_detail}>
                  <Text style={CartStyles.cart_item_name}>{item.book_name}</Text>
                  <Text>{item.book_name}</Text>
                  <Text>{`$${item.total_price} USD`}</Text>
                  <View style={CartStyles.amount_container}>
                  <TouchableOpacity onPress={handleMinus} style={CartStyles.amount_buttons}>
                    <Text style={CartStyles.amount_buttons_text}>-</Text>
                  </TouchableOpacity>
                  <Text style={[CartStyles.amount_buttons_text && CartStyles.amount_button_number]}>{amount}</Text>
                  <TouchableOpacity onPress={handlePlus} style={CartStyles.amount_buttons}>
                    <Text style={CartStyles.amount_buttons_text}>+</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={handleAddToCart} style={CartStyles.delete_container}>
                    <Image
                      source={require('../../images/icons/delete.png')}
                      style={CartStyles.delete_icon}
                    />
                  </TouchableOpacity>
                </View>
                </View>
              </View>
            )}
          />
          <Text style={CartStyles.total_text}>Total: <Text style={CartStyles.cart_item_name}>{userCart.total_price}</Text></Text>
          <Button
            text="Continue shopping"
            style={CartStyles.continue_button}
          />
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
    </ScrollView>
  );
};

export default Cart;
