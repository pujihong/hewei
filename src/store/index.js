import Vue from "vue";
import Vuex from "vuex";
import sys from "./modules/sys";
import tab from "./modules/tab";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    sys,
    tab
  }
});
