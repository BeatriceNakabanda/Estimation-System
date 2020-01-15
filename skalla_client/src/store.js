import Vue from "vue";
import Vuex from "vuex";
import Axios from "axios";
import createPersistedState from "vuex-persistedstate";


Vue.use(Vuex);

const getDefaultState = () => {
  return {
    token: "",
    user: {},
    estimateRequest: {}
  };
};

export default new Vuex.Store({
  strict: true,
  //intergrating vuex-persistedstate to get data even after reloading the page
  plugins: [createPersistedState()],
  state: getDefaultState(),
  getters: {
    isLoggedIn: state => {
      return state.token;
    },
    getUser: state => {
      return state.user;
    }
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token;
    },
    SET_USER: (state, user) => {
      state.user = user;
    },
    SET_ESTIMATE_REQUEST: (state, estimateRequest) => {
      state.estimateRequest = estimateRequest
    },
    RESET: state => {
      Object.assign(state, getDefaultState);
    }
  },
  // creating login and logout actions
  actions: {
    login: ({ commit }, { token, user }) => {
      commit("SET_TOKEN", token);
      commit("SET_USER", user);

      //setting Auth header
      Axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    },
    addEstimate: ({commit}, estimateRequest) => {
      commit("SET_ESTIMATE_REQUEST", estimateRequest)
    },
    logout: ({ commit }) => {
      commit("RESET", "");
    }
  },
});
