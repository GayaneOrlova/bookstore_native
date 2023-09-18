import { User } from '../../store/slices/userSlice';
import axios from './userInstance';

type TokensResponseType = {
  refresh: string;
  access: string;
};
type LoginSignupResponseType = {
  user: User;
  tokens: TokensResponseType;
};

export const userSignUp = ({
  email,
  password,
  confirm_password
}: {
  email: string;
  password: string;
  confirm_password: string;
}) => {
  return axios.post('/register/', { email, password, confirm_password });
};

export const userLogin = ({
  email,
  password
}: {
  email: string;
  password: string;
}) => {
  return axios.post<LoginSignupResponseType>('/login/', { email, password });
};

export const userPasswordChange = ({
  password,
  new_password,
  confirm_password,
}: {
  password: string;
  new_password: string;
  confirm_password: string;
}) => {
  return axios.post('/change-password/', { password, new_password, confirm_password });
};

export const userProfile = () => {
  return axios.get('/profile/')
};

export const getUser = () => {
  return axios.get<User>('/me/');
};

export const changeProfile = ({
bio
} : {
bio: string
}) => {
  return axios.put('profile/change/', {bio});
};


const changeAvatar = async (photo: string) => {
  return axios.post(`/avatar`, { photo });
};



