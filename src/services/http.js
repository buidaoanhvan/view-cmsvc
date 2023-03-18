import axios from "axios";

export function http(store) {
  axios.interceptors.request.use((config) => {
    store.commit("LOADING_ON");
    return config;
  });

  axios.interceptors.response.use((response) => {
    store.commit("LOADING_OFF");
    return response;
  });

  axios.interceptors.response.use(null, (error) => {
    store.commit("LOADING_OFF");
    return Promise.reject(error);
  });
}
