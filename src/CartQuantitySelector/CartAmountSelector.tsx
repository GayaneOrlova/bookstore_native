import React, { } from 'react';
import { Image, Text, TouchableOpacity, View } from "react-native";

import { changeCart } from '../api/book.api';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { changeCartItem, deleteCartItem } from '../store/slices/bookSlice';

import cartAmountSelectorStyles from './CartAmountSelectorStyles';

import { toast } from '../utils/utils';

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
      toast('The error occurred');
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
      toast('The error occurred');
    }
  };

  const handleDeleteCart = async (id: number) => {
    const amount = 0;
    try {
      const responce = await changeCart(amount, id);
      dispatch(deleteCartItem());
    }
    catch (er) {
      toast('The error occurred!');
    }
  };

  return (
    <View style={cartAmountSelectorStyles.container}>
      <TouchableOpacity onPress={() => handleMinus(props.id!)} style={cartAmountSelectorStyles.buttons}>
        <Text style={cartAmountSelectorStyles.buttons_text}>-</Text>
      </TouchableOpacity>
      <Text style={[cartAmountSelectorStyles.buttons_text && cartAmountSelectorStyles.buttons_number]}>{props.amount}</Text>
      <TouchableOpacity onPress={() => handlePlus(props.id!)} style={cartAmountSelectorStyles.buttons}>
        <Text style={cartAmountSelectorStyles.buttons_text}>+</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleDeleteCart(props.id!)} style={cartAmountSelectorStyles.delete_button}>
        <Image
          source={require('../../images/icons/delete.png')}
          style={cartAmountSelectorStyles.delete_icon}
        />
      </TouchableOpacity>
    </View>
  )
};

export default CartQuantitySelector;
