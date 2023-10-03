import axios from '../api/user.api/userInstance';

export type GenreResponseType = {
  id: number;
  name: string;
};

export const getAllGenres = () => {
  return axios.get<GenreResponseType[]>('/genres/');
};

