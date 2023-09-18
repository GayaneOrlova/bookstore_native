import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export type User = {
  email: string;
  id: string;
  username: string;
  
};

export type UserProfile = {
  avatar: string;
  bio: string;
};

export type UserPasswordChange = {
  success: string,
};

type UserSliceType = {
  user: User;
  UserPasswordChange: UserPasswordChange,
  userProfile: UserProfile,
};

const initialState: UserSliceType = {
  user: {
    id: '',
    email: '',
    username: '',
  },
  userProfile: {
    bio: '',
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
    setUserProfile(state, action){
      state.userProfile = action.payload;
    },
    setNewPassword(state, action){
      state.UserPasswordChange.success = action.payload;
    },
    
    logout(state) {
      (state.user.email = ''), (state.user.id = ''), (state.user.username = '');
    },
  },
});

export const {setUser, setUserProfile, setNewPassword, logout} = userSlice.actions;

export default userSlice.reducer;
