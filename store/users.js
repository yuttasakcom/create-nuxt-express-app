const state = {
  user: null
};

const mutations = {
  setUser(state, user) {
    state.user = user;
  }
};

const actions = {};

const getters = {
  user({ user }) {
    return user;
  },
  isAuthenticated({ user }) {
    return user !== null && user !== undefined;
  }
};

export default {
  state,
  mutations,
  actions,
  getters
};
