import { RootState } from "store/store";
import { createAsyncThunk, createSlice, isFulfilled } from "@reduxjs/toolkit";
import { Auth } from "service/auth";
import { LoginUser, RegisterUser, UserState } from "types/user";
import { getErrorData } from "utils";

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (loginData: LoginUser, { rejectWithValue }) => {
    try {
      const { data } = await Auth.login(loginData);
      return data;
    } catch (error: any) {
      throw error.response ? rejectWithValue(getErrorData(error)) : error;
    }
  }
);

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (registerData: RegisterUser, { rejectWithValue }) => {
    try {
      const { data } = await Auth.register(registerData);
      return data;
    } catch (error: any) {
      throw error.response ? rejectWithValue(getErrorData(error)) : error;
    }
  }
);

export const getCurrentUser = createAsyncThunk(
  "user/getCurrentUser",
  async (token: string, { rejectWithValue }) => {
    try {
      const { data } = await Auth.current(token);
      return data;
    } catch (error: any) {
      throw error.response ? rejectWithValue(getErrorData(error)) : error;
    }
  }
);

export const getUserProfile = createAsyncThunk(
  "user/getUserProfile",
  async (username: string, { rejectWithValue }) => {
    try {
      const { data } = await Auth.getUser(username);
      return data;
    } catch (error: any) {
      console.log({ error });
      throw error.response ? rejectWithValue(getErrorData(error)) : error;
    }
  }
);

const initialState: UserState = {
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logOut: () => {
      localStorage.removeItem("jwt");
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      isFulfilled(getCurrentUser, loginUser, registerUser, getUserProfile),
      (state, action) => {
        if (action.payload.token) {
          localStorage.setItem("jwt", action.payload.token);
          state.user = action.payload;
        } else {
          state.user!.user = action.payload;
        }
      }
    );
  },
});

export const { logOut } = userSlice.actions;

export const selectUser = (state: RootState) => state.user.user;
export const selectUsername = (state: RootState) =>
  state.user.user?.user.username;
export const selectUserToken = (state: RootState) => state.user.user?.token;

export default userSlice.reducer;
