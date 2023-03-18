import { currentUser } from "../../services/auth";

const user = currentUser();

export default {
  state: {
    currentUser: user,
    isLoggedIn: !!user,
    loading: false,
  },
  getters: {
    IS_LOADING: (state) => {
      return state.loading;
    },
    IS_LOGGEND_IN: (state) => {
      return state.isLoggedIn;
    },
    CURRENT_USER: (state) => {
      return state.currentUser;
    },
  },
  mutations: {
    LOGIN: (state) => {
      state.loading = true;
    },
    LOGIN_SUCCESS: (state, payload) => {
      state.isLoggedIn = true;
      state.loading = false;
      state.currentUser = Object.assign({}, payload.user, {
        token: payload.accessToken,
      });
      localStorage.setItem("user", JSON.stringify(state.currentUser));
    },
    LOGIN_FAILED: (state) => {
      state.isLoggedIn = false;
      state.loading = false;
    },
    LOGOUT: (state) => {
      localStorage.removeItem("user");
      state.isLoggedIn = false;
      state.currentUser = null;
    },
    LOADING_ON: (state) => {
      state.loading = true;
    },
    LOADING_OFF: (state) => {
      state.loading = false;
    },
  },
  actions: {
    LOGIN: (context) => {
      context.commit("LOGIN");
    },
  },
};
