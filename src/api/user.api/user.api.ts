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

export const userProfile = () => {
  return axios.get('/profile/avatar/')
};

export const userPasswordChange = ({
  email,
  password,
  new_password,
  confirm_password
} : {
  email: string;
  password: string;
  new_password: string;
  confirm_password: string;
}) => {
  return axios.put('/change-password/', {email, password, new_password, confirm_password});
};

// export const userPasswordChange = (options: {
//   email: string;
//   old_password: string;
//   new_password: string;
// }) => {
//   const {...params} = options;
//   console.log(params);
//   return axios.put(`/change-password/`, params);
// };



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


