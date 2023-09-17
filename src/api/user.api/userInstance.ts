import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const userInstance = axios.create({
  baseURL: 'http://localhost:8000',
});

userInstance.interceptors.request.use(async config => {
  const token = await AsyncStorage.getItem('access');
  console.log(token)

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default userInstance;
