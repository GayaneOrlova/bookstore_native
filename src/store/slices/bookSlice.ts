import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { User } from './userSlice';

export type BookType = {
  title: string;
  author: string;
  genre: string;
  published_at: number;
  price: number;
  image: string;
  body: string;
  available: boolean;
  recommendation: boolean;
  new: boolean;
  bestseller: boolean;
  overall_rating: number;
  like: boolean;
  id: number;
};

export type CommentsType = {
  id: number;
  body: string;
  created_at: string;
  createdUser: User;
  avatar_url: string;
  author: string;
  like: boolean;
};

export type GenreType = {
  id: number;
  name: string;
};

export type RatingType = {
  id: number | null;
  rating: number | null;
};

export type CartType = {
  items: [];
  total_price: number | null;
};

type BookSliceType = {
  booksStore: BookType[],
  ratingStore: RatingType,
  cartStore: CartType,
};

const initialState: BookSliceType = {
  booksStore: [],
  cartStore: {
    items: [],
    total_price: null
  },
  ratingStore: {
    id: null,
    rating: null
  },
};

const bookSlice = createSlice({
  name: 'bookSlice',
  initialState,
  reducers: {
    setBooks(state, action) {
      state.booksStore = action.payload;
    },
    changeBookLike(state, action) {
      const book = state!.booksStore!.findIndex(
        (item) => item.id === action.payload,
      );
      state.booksStore[book].like =
        !state.booksStore[book].like;
    },
    setCart(state, action) {
      state.cartStore = action.payload;
    },


    setBookRating(state, action: PayloadAction<{ rating: number; id: number }>) {
      state.ratingStore = action.payload;
    },


    filteredBooks(state, action) {
      const booksList = state.booksStore.map((book) => {
        const test = book.genre.map(genre => {

          if (action.payload.genresFilter.includes(genre)) {
            return book
          }
        })
        return test![0]
        // console.log("test", test)

      })
      console.log(booksList)

    },



  },

});

export const { setBooks, setCart, setBookRating, changeBookLike, filteredBooks } = bookSlice.actions;
export default bookSlice.reducer;
