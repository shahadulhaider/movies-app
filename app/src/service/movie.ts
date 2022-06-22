import { Movie } from "types/movie";
import api from "./apiService";

// Movie
export const MovieApi = {
  findMovie: (title: string) => api.get(`/movies/${title}`),
  createMovie: (movie: Movie) => api.post("/movies", movie),
  addFavorite: (title: string) => api.put(`/movies/${title}/favorite`, title),
  removeFavorite: (title: string) =>
    api.put(`/movies/${title}/unfavorite`, title),
};
