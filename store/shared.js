const state = {
  loading: false,
  error: null
};

const mutations = {
  setLoading(state, payload) {
    state.loading = payload;
  },
  setError(state, payload) {
    state.error = payload;
  },
  clearError(state, payload) {
    state.error = null;
  }
};

const actions = {
  setLoading({ commit }, payload) {
    commit("setLoading", payload);
  },
  clearError({ commit }) {
    commit("clearError");
  }
};

const getters = {
  loading({ loading }) {
    return loading;
  },
  error({ error }) {
    return error;
  }
};

export { state, mutations, actions, getters };
