import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import type { User } from './userSlice';

export type BookType = {
  title: string;
  author: string;
  genre: string;
  available: boolean;
  image: string;
  price: number;
  rating: number;
  likes: boolean;
  body: string;
  id: number;
};

export type CommentsType = {
  id: number;
  text: string;
  createdDate: string;
  createdUser: User;
};

export type GenreType = {
    genreId: number;
    name: string;
  };

type BookSliceType = {
  booksStore: BookType[]
};

const initialState: BookSliceType = {
  booksStore: [],
};


const bookSlice = createSlice({
  name: 'bookSlice',
  initialState,
  reducers: {
    setBooks(state, action) {
      state.booksStore = action.payload;
    },
    setNewRating(state, action: PayloadAction<{ newRating: string; id: number }>) {
      const index = state.booksStore.findIndex((item) => item.id === action.payload.id);
      const book = state.booksStore[index];
      const rating = Number(action.payload.newRating) * 10;
    },
    changeBookLike(state, action) {
      const book = state!.booksStore!.findIndex(
        (item) => item.id === action.payload,
      );
      state.booksStore[book].likes =
        !state.booksStore[book].likes;
    },
  },

});

export const {setBooks, setNewRating, changeBookLike} = bookSlice.actions;
export default bookSlice.reducer;
