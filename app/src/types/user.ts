import { Movie } from "./movie";

export interface User {
  id: string;
  email: string;
  username: string;
  created: string;
  updated: string;
  favorites: Movie[];
}

export interface LoginUser {
  email: string;
  password: string;
}

export interface RegisterUser {
  username: string;
  email: string;
  password: string;
}

export interface UserRes {
  token: string;
  user: User;
}

export interface UserState {
  user: UserRes | null;
}
