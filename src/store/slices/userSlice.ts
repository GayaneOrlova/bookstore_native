import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export type User = {
  email: string;
  id: string;
  username: string;
};

type UserSliceType = {
  user: User;
};

const initialState: UserSliceType = {
  user: {
    id: '',
    email: '',
    username: '',
  },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User>) {
      state.user = action.payload;
    },
    logout(state) {
      (state.user.email = ''), (state.user.id = ''), (state.user.username = '');
    },
  },
});

export const {setUser, logout} = userSlice.actions;

export default userSlice.reducer;
