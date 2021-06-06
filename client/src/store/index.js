import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    name: "",
    email: "",
    token: "",
    api_key: "",
    isPerfilSet: false,
    perfilName: "",
    perfilId: "",
    isAuth: false,
  },
  mutations: {
    authenticate(state, payload) {
      state.name = payload.name;
      state.email = payload.email;
      state.token = payload.token;
      state.api_key = payload.api_key;
      state.isAuth = true;
    },
    logout(state) {
      state.name = "";
      state.email = "";
      state.token = "";
      state.api_key = "";
      state.isPerfilSet = false;
      state.perfilName = "";
      state.perfilId = "";
      state.isAuth = false;
    },
    setPerfil(state, payload){
      state.isPerfilSet = true;
      state.perfilName = payload.perfilName;
      state.perfilId = payload.perfilId;
    }
  },
  actions: {
    authenticate({ commit }, payload) {
      commit("authenticate", payload);
    },
    logout({ commit }) {
      commit("logout");
    },
    setPerfil({commit}, payload) {
      commit("setPerfil", payload);
    }
  },
  modules: {},
  plugins: [createPersistedState()],
});
