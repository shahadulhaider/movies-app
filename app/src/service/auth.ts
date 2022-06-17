import { LoginUser, RegisterUser, UserRes } from "types/user";
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
        authorization: `Bearer ${token}`,
      },
    }),

  getUser: async (token: string, username: string) =>
    await api.get<UserRes>(`users/u/${username}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }),
};
