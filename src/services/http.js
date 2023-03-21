import axios from "axios";
import { loadingStore } from "../store/index";

export function http() {
  const loading = loadingStore();
  axios.interceptors.request.use((config) => {
    loading.loadingTrue();
    return config;
  });

  axios.interceptors.response.use((response) => {
    loading.loadingFalse();
    return response;
  });

  axios.interceptors.response.use(null, (error) => {
    loading.loadingFalse();
    return Promise.reject(error);
  });
}
