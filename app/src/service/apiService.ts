import axios from "axios";
import { store } from "store/store";

axios.defaults.baseURL = "http://localhost:8000/api/";

axios.interceptors.request.use(function (config) {
  if (!config.headers) config.headers = {};

  const token = store.getState().user.user?.token;

  if (token) config.headers.Authorization = `Bearer ${token}`;

  return config;
});

export default axios;
