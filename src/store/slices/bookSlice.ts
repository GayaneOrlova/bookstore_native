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
  rating: number;
  like: boolean;
  id: number;
  comments: [];
};

export type CommentsType = {
  id: number;
  body: string;
  created_at: string;
  createdUser: User;
  avatar_url: string;
  author: string;
};

export type GenreType = {
  id: number;
  name: string;
};

export type RatingType = {
  id: number | null;
  rating: number | null;
};

export type CartItemType = {
    amount: number | null,
    book_image: string,
    book_name: string,
    book_author: string,
    id: number | null,
    price: number | null,
};

export type CartType = {
  id: number | null;
  items: CartItemType[];
  total_price: number | null;
};

export type Pagination = {
  count: number,
  next: string,
  previous: string,
  results: BookType[],
}

type BookSliceType = {
  pagination: Pagination,
  currentPage: number,
  ratingStore: RatingType,
  cartStore: CartType,
  bookComments: CommentsType [],
};

const initialState: BookSliceType = {
  pagination: {
    count: 0,
    next: '',
    previous: '',
    results: [],
  },
  currentPage: 1,
  cartStore: {
    id: null,
    items: [],
    total_price: null
  },
  ratingStore: {
    id: null,
    rating: null
  },
  bookComments: [],
};

const bookSlice = createSlice({
  name: 'bookSlice',
  initialState,
  reducers: {
    setPagination(state, action: PayloadAction<Pagination>) {
      state.pagination = action.payload;
      console.log(action.payload, 'action.payload')
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload
    },
    changeBookLike(state, action) {
      const book = state!.pagination.results!.findIndex(
        (item) => item.id === action.payload,
      );
      state.pagination.results[book].like =
        !state.pagination.results[book].like;
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
      state.cartStore.items = updatedItems;
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
    },//not good
  },
});

export const { setPagination, setCurrentPage, setCart, setBookRating, changeCartItem, changeBookLike, filteredBooks } = bookSlice.actions;
export default bookSlice.reducer;
