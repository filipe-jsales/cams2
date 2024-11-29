import axios from "axios";
import { logout } from "../store/slices/authSlice";
let reduxStore: Store;
import { Store } from "redux";

export const setStore = (store: Store) => {
  reduxStore = store;
};

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      const { status } = error.response;

      if (status === 401 || status === 403) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        if (reduxStore) {
          reduxStore.dispatch(logout());
        }
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default api;
