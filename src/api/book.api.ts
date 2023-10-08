import { BookType, CommentsType, GenreType } from '../store/slices/bookSlice';
import axios from '../api/user.api/userInstance';

export const getAllBooks = () => {
  return axios.get<BookType[]>('/all-books/');
};//good

export const getBookById = (bookId: number) => {
  return axios.get<BookType>(`/books/${bookId}`);
};//good

export const createBookComment = (bookId: number, body: string) => {
  return axios.post(`/comment/create/${bookId}/`, {body});
};//good

export const getBookComment = (bookId: number) => {
  return axios.get(`/book-comment/${bookId}/`);
};//good


export const getBookRating = (bookId: number) => {
  return axios.get(`book-rating/${bookId}/`);
};//good

export const createBookRating = (bookId: number, rating: number) => {
  return axios.post(`book-rating/create/${bookId}/`, {rating});
};//good

export const getFavoritesBooks = () => {
  return axios.get<BookType[]>('/favorites-books/');
};//good

export const getAllGenres = () => {
  return axios.get<GenreType[]>('/genres/');
};//good

export const getCart = () => {
  return axios.get('/cart/');
};//good

export const changeCart = (amount: number, bookId: number) => {
  return axios.post('/cart-item/update/', {amount, bookId});
};//good

export const createCartItem = (bookId: number) => {
  return axios.post('/add-to-cart/', {id: bookId});
};//good

export const changeFavoriteById = (bookId: number) => {
  return axios.post<BookType>('/favorite-change/', {id:bookId});
};//good

// export const getFavoritesBook = () => {
//   return axios.get('/favorite-list/');
// };//good


export const filterBooks = (params: object) => {
  return axios.get<BookType[]>('/books', { params });
};



