import axios from "axios";
import stores from "../stores";

const { auth } = stores.getState();
export const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

// console.log("auth", auth);

axiosInstance.interceptors.request.use(
  function (config) {
    const token = auth.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      // console.log("auth token", config.headers.Authorization);
    }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    const statusCode = error.response.status;

    console.log("statusCode", statusCode);

    if (statusCode === 108) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    if (statusCode === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);
