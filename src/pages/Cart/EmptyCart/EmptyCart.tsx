import React from 'react';
import { Image, Text, View } from "react-native";
import { ScrollView } from 'react-native-gesture-handler';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

import Button from '../../Button/Button';
import Header from '../../Header/Header';
import Footer from '../../Footer/Footer';
import emptyCartStyles from './EmptyCartStyles';


type Props = {}
type RootStackParamList = {
  Homepage: undefined;
};
type NavigationProps = StackNavigationProp<RootStackParamList>;

const EmptyCart: React.FC<Props> = () => {
  const navigation = useNavigation<NavigationProps>();
  const onHomepage = () => {
    navigation.navigate('Homepage');
  };

  return (
      <ScrollView>
      <Header />
        <View style={emptyCartStyles.container}>
          <Text style={emptyCartStyles.text}>Your cart is empty</Text>
          <Text style={emptyCartStyles.text_description}>Add items to cart to make a purchase.Go to the catalogue no.</Text>
          <Button
            text="Go to catalog"
            style={emptyCartStyles.cart_button}
            onPress={onHomepage}
          />
          <Image
            style={emptyCartStyles.image}
            source={require('../../../images/books.png')}
          />
        </View>
        <Footer />
        </ScrollView>
  );
};

export default EmptyCart;
