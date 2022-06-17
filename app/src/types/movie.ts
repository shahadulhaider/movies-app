import { ResponseStatus } from "./api";
import { ResError } from "./error";

export interface Movie {
  id: string;
  title: string;
  actors: string;
  director: string;
  genre: string;
  language: string;
  plot: string;
  poster: string;
  runtime: string;
  year: number;
  imdbID: string;
  imdbRating: number;
  imdbVotes: number;
}

export interface SingleMovieRes {
  movie: Movie;
}

export interface MultiMoviesRes {
  movies: Movie[];
  moviesCount: number;
}

export interface NewMovie {
  title: string;
  actors?: string;
  director?: string;
  genre?: string;
  language?: string;
  plot?: string;
  poster: string;
  runtime: string;
  year?: number;
  imdbID: string;
  imdbRating: number;
  imdbVotes: number;
}

export interface INewMovieReq {
  movie: NewMovie;
}

export interface MovieState {
  movie: Movie | null;
  status: ResponseStatus;
  error: ResError | null;
}
