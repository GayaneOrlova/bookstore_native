import { BookType, CommentsType, GenreType, Pagination } from '../store/slices/bookSlice';
import axios from '../api/user.api/userInstance';

export const getPage = (page: number, queryString?: string) => {
  return axios.get<Pagination>(`/all-books/?page=${page}${queryString ? '&' + queryString : ''}`);

};//good

export const getBookById = (bookId: number) => {
  return axios.get<BookType>(`/books/${bookId}/`);
};//good

export const getRecommended = () => {
  return axios.get<BookType[]>('recommended-books/');
};//good

export const createBookComment = (body: string, bookId: number) => {
  return axios.post(`comments/create/`, {body: body, book: bookId});
};//good

// export const getBookComment = (bookId: number) => {
//   return axios.get(`/book-comment/${bookId}/`);
// };//good


// export const getBookRating = (bookId: number) => {
//   return axios.get(`book-rating/${bookId}/`);
// };//good

export const createBookRating = (bookId: number, rating: number) => {
  return axios.post(`book-rating/create/${bookId}/`, {rating: rating});
};//good

export const getFavoritesBooks = () => {
  return axios.get<BookType[]>('/favorite-list/');
};//good

export const changeFavoriteById = (bookId: number) => {
  return axios.post<BookType>('/favorite-change/', {id:bookId});
};//good

export const getAllGenres = () => {
  return axios.get<GenreType[]>('/genres/');
};//good

export const getBooksByGenre = (genre: string) => {  
  return axios.get(`/all-books/?${genre}`);
};//good

export const getCart = () => {
  return axios.get('/cart/');
};//good

export const changeCart = (amount: number, id: number) => {
  return axios.post('/cart-item/update/', {amount: amount, id: id});
};//good

export const createCartItem = (bookId: number) => {
  return axios.post('/add-to-cart/', {id: bookId});
};//good



// export const getFavoritesBook = () => {
//   return axios.get('/favorite-list/');
// };//good


export const filterBooks = (params: object) => {
  return axios.get<BookType[]>('/books', { params });
};



