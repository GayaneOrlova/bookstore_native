import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { User } from './userSlice';

export type BookType = {
  title: string;
  author: string;
  genre: string;
  available: boolean;
  image: string;
  price: number;
  overall_rating: number;
  likes: boolean;
  body: string;
  recommendation: boolean;
  id: number;
};

export type CommentsType = {
  id: number;
  text: string;
  createdDate: string;
  createdUser: User;
  avatar_url: string;
  author: string;
};

export type GenreType = {
  id: number;
  name: string;
};

export type RatingType = {
  id: number;
  rating: number;
};

type BookSliceType = {
  booksStore: BookType[],
  ratingStore: RatingType,
};

const initialState: BookSliceType = {
  booksStore: [],
  ratingStore: {
    id: 0,
    rating: 0
  }
};


const bookSlice = createSlice({
  name: 'bookSlice',
  initialState,
  reducers: {
    setBooks(state, action) {
      state.booksStore = action.payload;
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

    setBookRating(state, action: PayloadAction<{ rating: number; id: number }>) {
      state.ratingStore = action.payload;
      // const index = state.booksStore.findIndex((item) => item.id === action.payload.id);
      // const book = state.booksStore[index];
      // const rating = Number(action.payload.rating);
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

export const { setBooks, setBookRating, changeBookLike, filteredBooks } = bookSlice.actions;
export default bookSlice.reducer;
