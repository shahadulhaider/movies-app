import { LoginUser, RegisterUser, User, UserRes } from "types/user";
import api from "./apiService";

// User and Authentication
export const Auth = {
  login: async (loginUser: LoginUser) =>
    await api.post("auth/login", loginUser),

  register: async (registerUser: RegisterUser) =>
    await api.post<UserRes>("auth/register", registerUser),

  current: async (token: string) =>
    await api.get<UserRes>("auth/me", {
      headers: {
        authorization: token,
      },
    }),

  getUser: async (username: string) =>
    await api.get<User>(`users/u/${username}`),
};
