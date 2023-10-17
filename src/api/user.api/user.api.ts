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
console.log('password, new_password, confirm_password', password, new_password, confirm_password)

  return axios.post('/change-password/', { password, new_password, confirm_password });
};



export const getUser = () => {
  return axios.get<User>('/me/');
};

export const changeUserinfo = ({
  email,
  username,
} : {
  email: string;
  username?: string,
}) => {
  return axios.put('/change-userinfo/', {email, username});
};

export const getAvatar = () => {
  return axios.get(`/avatar/`);
};

export const changeAvatar = (avatar: any) => {
  return axios.patch(`/change-avatar/`, avatar, {headers: {
    'content-type': 'multipart/form-data'
  }});
};


