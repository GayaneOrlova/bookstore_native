import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export type User = {
  email: string;
  id: string;
  username: string;
};

export type UserProfile = {
  avatar: string;
};

type UserSliceType = {
  user: User;
  userAvatar: UserProfile;
};

const initialState: UserSliceType = {
  user: {
    id: '',
    email: '',
    username: '',
  },
  userAvatar: {
    avatar: '',
  },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User>) {
      state.user = action.payload;
    },
    
    setUserProfile(state, action){
      state.userAvatar = action.payload;
    },
    
    logout(state) {
      (state.user.email = ''), (state.user.id = ''), (state.user.username = '');
    },
  },
});

export const {setUser, setUserProfile, logout} = userSlice.actions;

export default userSlice.reducer;
