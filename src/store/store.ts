import {configureStore} from '@reduxjs/toolkit';

import userSlice from './slices/userSlice';
import bookSlice from './slices/bookSlice';

const store = configureStore({
  reducer: {
    user: userSlice,
    book: bookSlice,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
