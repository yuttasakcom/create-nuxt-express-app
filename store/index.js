import Vue from "vue";
import Vuex from "vuex";
import cameCase from "lodash/camelCase";

Vue.use(Vuex);

const requireModule = require.context("./", false, /\.js$/);
const modules = {};

requireModule.keys().forEach(filename => {
  if (filename === "./index.js") return;

  const moduleName = cameCase(filename.replace(/(\.\/|\.js)/g, ""));
  const storeConfig = requireModule(filename);
  modules[moduleName] = {
    namespaced: true,
    ...(storeConfig.default || storeConfig)
  };
});

const createStore = () =>
  new Vuex.Store({
    modules
  });

export default createStore;
