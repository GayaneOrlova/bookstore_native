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

export const userProfile = () => {
  return axios.get('/profile/')
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


// export const changeProfile = (bio: string, email: string) => {
//   return axios.put('/change-password/', { bio, image});
// };

// const changeData = async (userId: number | undefined, fullName: string, email: string) => {
//   return await axios.put<{ user: User; message: string }>(`/user/${userId}`, { fullName, email });
// };


export const getUser = () => {
  return axios.get<User>('/me/');
};


