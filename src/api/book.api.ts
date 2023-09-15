import { BookType } from '../store/slices/bookSlice';
import axios from '../api/user.api/userInstance';

export const getAllBooks = () => {
  return axios.get<BookType[]>('/books/');
};
