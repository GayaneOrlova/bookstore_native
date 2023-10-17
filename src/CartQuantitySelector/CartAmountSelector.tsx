import React, { } from 'react';
import { Image, Text, TouchableOpacity, View } from "react-native";
import { changeCart } from '../api/book.api';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { changeCartItem, deleteCartItem } from '../store/slices/bookSlice';
import { toastic } from '../utils/utils';
import CartAmountSelectorStyles from './CartAmountSelectorStyles';

type Props = {
  id: number | null;
  amount: number | null;
}

const CartQuantitySelector: React.FC<Props> = (props) => {
  const dispatch = useAppDispatch();
  const cartList = useAppSelector(state => state.book.cartStore);

  const handleMinus = async (id: number) => {
    const currentCartItem = cartList.items.find(item => item.id === id);
    if (currentCartItem?.amount! < 0) { return; };
    const amount = currentCartItem?.amount! - 1;
    try {
      const responce = await changeCart(amount, id);
      dispatch(changeCartItem(responce.data));
    }
    catch (er) {
      toastic('The error occurred');
    }
  };

  const handlePlus = async (id: number) => {
    const currentCartItem = cartList.items.find(item => item.id === id);
    const amount = currentCartItem?.amount! + 1;
    try {
      const responce = await changeCart(amount, id);
      dispatch(changeCartItem(responce.data));
    }
    catch (er) {
      toastic('The error occurred');
    }
  };

  const handleDeleteCart = async (id: number) => {
    const amount = 0;
    try {
      const responce = await changeCart(amount, id);
      dispatch(deleteCartItem());
    }
    catch (er) {
      toastic('The error occurred!');
    }
  };

  return (
    <View style={CartAmountSelectorStyles.container}>
      <TouchableOpacity onPress={() => handleMinus(props.id!)} style={CartAmountSelectorStyles.buttons}>
        <Text style={CartAmountSelectorStyles.buttons_text}>-</Text>
      </TouchableOpacity>
      <Text style={[CartAmountSelectorStyles.buttons_text && CartAmountSelectorStyles.buttons_number]}>{props.amount}</Text>
      <TouchableOpacity onPress={() => handlePlus(props.id!)} style={CartAmountSelectorStyles.buttons}>
        <Text style={CartAmountSelectorStyles.buttons_text}>+</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleDeleteCart(props.id!)} style={CartAmountSelectorStyles.delete_button}>
        <Image
          source={require('../../images/icons/delete.png')}
          style={CartAmountSelectorStyles.delete_icon}
        />
      </TouchableOpacity>
    </View>
  )
};

export default CartQuantitySelector;
