// Manages the state of the user account
export const state = {
  email: '',
  id: '123', 
  name: 'Anfan',
  loggedIn: false
}

export const mutations = {
  SET_LOGGED_IN(state, value) {
    state.loggedIn = value;
  },
  SET_EMAIL(state, value) {
    state.email = value;
  }
}

export const actions = {
  fetchUser({ commit }, user) {
    commit("SET_LOGGED_IN", user !== null);
    if (user) {
      commit("SET_EMAIL", user.email)
    } else {
      commit("SET_EMAIL", null)
    }
  }
}

export const getters = {
  currentUser: state => {
    return state.user
  }
}