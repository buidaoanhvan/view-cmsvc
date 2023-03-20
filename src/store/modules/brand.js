import axios from "axios";
import api_url from "../../configs/api";

const state = {
  all: [],
};

const getters = {
  getBrands(state) {
    return state.all;
  },
};

const actions = {
  async getAllBrand({ commit }) {
    try {
      const res = await axios.get(api_url.brand);
      const { data, statusCode } = res.data;
      if (statusCode == 200) {
        commit("setBrands", data);
      }
    } catch (error) {
      console.log(error);
    }
  },
};

const mutations = {
  setBrands(state, brands) {
    state.all = brands;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
