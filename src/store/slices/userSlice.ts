import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export type User = {
  email: string;
  id: string;
  username: string;
  cart_items_count: number;
  cart_items_books: [];
  favorites_count: number;
};

export type UserAvatar = {
  avatar: string;
};

export type UserPasswordChange = {
  success: string,
};

type UserSliceType = {
  user: User;
  UserPasswordChange: UserPasswordChange,
  userAvatar: UserAvatar,
};

const initialState: UserSliceType = {
  user: {
    id: '',
    email: '',
    username: '',
    cart_items_count: 0,
    cart_items_books: [],
    favorites_count: 0,
  },
  userAvatar: {
    avatar: '',
  },
  UserPasswordChange: {
    success: '',
  }
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User>) {
      state.user = action.payload;
    },
    setAvatar(state, action){
      state.userAvatar.avatar = action.payload;
    },
    setNewPassword(state, action){
      state.UserPasswordChange.success = action.payload;
    },
    
    logout(state) {
      (state.user.email = ''), (state.user.id = ''), (state.user.username = '');
    },
  },
});

export const {setUser, setAvatar, setNewPassword, logout} = userSlice.actions;

export default userSlice.reducer;
