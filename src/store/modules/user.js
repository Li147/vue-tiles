// Manages the state of the user account
export const state = {
  loggedIn: false,
  email: '',
  displayName: '',
}

export const mutations = {
  SET_LOGGED_IN(state, value) {
    state.loggedIn = value;
  },
  SET_EMAIL(state, value) {
    state.email = value;
  },
  SET_DISPLAYNAME(state, value) {
    state.displayName = value
  }
}

export const actions = {
  login({ commit }, user) {
    commit("SET_LOGGED_IN", true)
    commit("SET_EMAIL", user.email)
    commit("SET_DISPLAYNAME", user.displayName)
  },
  logout({commit}){
    commit("SET_LOGGED_IN", false)
    commit("SET_EMAIL", '')
    commit("SET_DISPLAYNAME", '')
  }
}

export const getters = {
  currentUser: state => {
    return state.user
  }
}