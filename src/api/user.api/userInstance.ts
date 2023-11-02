import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

let baseURL = '';

if (Platform.OS === 'ios') {
  baseURL = 'http://localhost:8000';
} else if (Platform.OS === 'android') {
  baseURL = 'http://10.0.2.2:8000';
}

const userInstance = axios.create({
  baseURL: baseURL,
});

userInstance.interceptors.request.use(async config => {
  const token = await AsyncStorage.getItem('access');
    if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default userInstance;


