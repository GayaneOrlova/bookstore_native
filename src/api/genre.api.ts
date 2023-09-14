import axios from '../api/user.api/userInstance';

type GenreResponseType = {
  id: number;
  name: string;
};

export const getAllGenres = () => {
  return axios.get<GenreResponseType[]>('/genres/');
};

