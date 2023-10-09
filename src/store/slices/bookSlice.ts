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

// type ItemType = {
//   items: [{
//     amount: number | null,
//     book_image: string,
//     book_name: string,
//     id: number | null,
//     price: number | null
//   }];
// }

export type CartType = {
  items: [{
    amount: number | null,
    book_image: string,
    book_name: string,
    id: number | null,
    price: number | null
  }];
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
    items: [{
      amount: null,
      book_image: '',
      book_name: '',
      id: null,
      price: null
    }],
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
    changeCartItem(state, action: PayloadAction<CartType>) {
      const newItem = action.payload;      
      const updatedItems = state.cartStore.items.map((item) => {
        if (item.id === newItem.id) {
          return newItem;
        }
        return item;
      });
      state.cartStore.items = updatedItems
      console.log('updatedItems', updatedItems)  
      console.log('state',state.cartStore)
    },
    setBookRating(state, action: PayloadAction<{ rating: number; id: number }>) {
      state.ratingStore = action.payload;
    },
    filteredBooks(state, action) {
      state.booksStore = state.booksStore.map((book) => {
        if(book.genre.some((genre) => action.payload.genresFilter.includes(genre))) {
          return book;
        }
      }).filter((notEmpty) => notEmpty)
    },
  },
});

export const { setBooks, setCart, setBookRating, changeCartItem, changeBookLike, filteredBooks } = bookSlice.actions;
export default bookSlice.reducer;
