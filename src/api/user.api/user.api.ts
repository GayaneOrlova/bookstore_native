import {User} from '../../store/slices/userSlice';
import axios from './userInstance';

type TokensResponseType = {
  refresh: string;
  access: string;
};
type LoginResponseType = {
  user: User;
  tokens: TokensResponseType;
};
type SigninResponseType = {
  user: User;
  tokens: TokensResponseType;
};

export const userLogin = ({
  email,
  password
}: {
  email: string;
  password: string;
}) => {
  return axios.post<LoginResponseType>('/login/', {email, password});
};

export const userSignUp = ({
  email,
  password,
  passwordConfirm
}: {
  email: string;
  password: string;
  passwordConfirm: string;
}) => {
  return axios.post<SigninResponseType>('/signup/', {email, password, passwordConfirm});
};

export const getUser = () => {
  return axios.get<User>('/me/');
};
