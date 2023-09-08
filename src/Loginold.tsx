import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {View, TouchableOpacity, Image, TextInput, Button} from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = () => {
  const navigation = useNavigation();

  const onHomepage = () => {
    navigation.navigate('Homepage');
  };

  const onEmailChange = text => {
    setEmail(text);
  };

  const onPasswordChange = text => {
    setPassword(text);
  };

  // const onLogin = async () => {
  //   try {
  //     const response = await postUser({email, password});
  //     await AsyncStorage.setItem('access', response.data.tokens.access);
  //     dispatch(setUser(response.data.user));
  //   } catch (er) {
  //     console.log(er);
  //   }
  // };

  return (
    <View>
      <TouchableOpacity onPress={onHomepage}>
        <Image
          source={{
            uri: 'https://w7.pngwing.com/pngs/752/415/png-transparent-e-commerce-computer-icons-shopping-others-angle-text-triangle-thumbnail.png',
          }}
        />
      </TouchableOpacity>
      <TextInput
        placeholder="Email"
        // value={email}
        // onChangeText={texts => setEmail(texts)}
        // onChange={onEmailChange}
      />
      <TextInput
        // style={LoginStyles.input_container}
        placeholder="Password"
        // value={password}
        secureTextEntry={true}
        // onChangeText={texts => setPassword(texts)}
        // onChange={onPasswordChange}
      />
      <Button
        title="LOGIN" // onPress={onLogin}
      />
    </View>
  );
};

export default Login;
function setEmail(text: any) {
  throw new Error('Function not implemented.');
}

function setPassword(text: any) {
  throw new Error('Function not implemented.');
}

