import { BookType, CommentsType, GenreType } from '../store/slices/bookSlice';
import axios from '../api/user.api/userInstance';

export const getAllBooks = () => {
  return axios.get<BookType[]>('/all-books/');
};//good

export const getBookById = (bookId: string | undefined) => {
  return axios.get<BookType>(`/books/${bookId}`);
};//good

export const createComment = (bookId: string, body: string) => {
  return axios.post<CommentsType>('/comment/create/', { bookId, body });
};//good

export const createBookRating = (bookId: number, rating: number) => {
  return axios.post('book-ratings/<int:pk>/create/', { bookId, rating });
};

export const getFavoritesBooks = () => {
  return axios.get<BookType[]>('/favorites-books/');
};//good

export const addFavoriteById = (bookId: number) => {
  return axios.post<BookType>(`/favorites/add/${bookId}`);
};

export const deletFavoriteById = (bookId: number) => {
  return axios.delete(`/favorites/delete/${bookId}`);
};

export const getAllGenres = () => {
  return axios.get<GenreType[]>('/genres/');
};//good

export const filterBooks = (params: object) => {
  return axios.get<BookType[]>('/books', { params });
};


