import axios, { AxiosRequestConfig } from "axios";

const BASE_URL = "http://localhost:3001";
const API_USERNAME = "my-api-user";
const API_PASSWORD = "Test-pass1";

const axiosInstance = axios.create();

axiosInstance.interceptors.response.use((response) => response.data);

export const http = {
  post: async <T>(url: string, body: object, settings: AxiosRequestConfig = {}) => {
    return axiosInstance.post<T>(url, body, {
      ...settings,
      auth: {
        username: API_USERNAME,
        password: API_PASSWORD,
      },
      baseURL: BASE_URL,
    });
  },
};
