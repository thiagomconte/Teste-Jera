import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        name: "",
        email: "",
        token: "",
        isAuth: false,
    },
    mutations: {
        authenticate(state, payload) {
            state.name = payload.name;
            state.email = payload.email;
            state.token = payload.token;
            state.isAuth = true;
        },
        logout(state) {
            state.name = "";
            state.email = "";
            state.token = "";
            state.isAuth = false;
        },
    },
    actions: {
        authenticate({ commit }, payload) {
            commit("authenticate", payload);
        },
        logout({ commit }) {
            commit("logout");
        },
    },
    modules: {},
    plugins: [createPersistedState()],
});