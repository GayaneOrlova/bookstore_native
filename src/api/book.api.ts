import { BookType, GenreType, Pagination } from '../store/slices/bookSlice';
import axios from '../api/user.api/userInstance';

export const getPage = (page?: number, queryString?: string) => {
console.log('333', `/all-books/?page=${page}${queryString ? '&' + queryString : ''}`)

  return axios.get<Pagination>(`/all-books/?page=${page}${queryString ? '&' + queryString : ''}`);
};

export const getBookById = (bookId: number) => {
  return axios.get<BookType>(`/books/${bookId}/`);
};

export const getRecommended = () => {
  return axios.get<BookType[]>('recommended-books/');
};

export const createBookComment = (body: string, bookId: number) => {
  return axios.post(`comments/create/`, {body: body, book: bookId});
};

export const createBookRating = (bookId: number, rating: number) => {
  return axios.post(`book-rating/create/${bookId}/`, {rating: rating});
};

export const getFavoritesBooks = () => {
  return axios.get<BookType[]>('/favorite-list/');
};

export const changeFavoriteById = (bookId: number) => {
  return axios.post<BookType>('/favorite-change/', {id:bookId});
};

export const getAllGenres = () => {
  return axios.get<GenreType[]>('/genres/');
};

export const getBooksByGenre = (genre: string) => {  
  return axios.get(`/all-books/?${genre}`);
};

export const getCart = () => {
  return axios.get('/cart/');
};

export const changeCart = (amount: number, id: number) => {
  return axios.post('/cart-item/update/', {amount: amount, id: id});
};

export const createCartItem = (bookId: number) => {
  return axios.post('/add-to-cart/', {id: bookId});
};

export const filterBooks = (params: object) => {
  return axios.get<BookType[]>('/books', { params });
};



