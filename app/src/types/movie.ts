import { User } from "./user";

export interface Movie {
  title: string;
  actors: string;
  director: string;
  genre: string;
  language: string;
  plot: string;
  poster: string;
  runtime: string;
  year: string;
  imdbID: string;
  imdbRating: string;
  imdbVotes: string;
  favoritedBy?: User[];
}
