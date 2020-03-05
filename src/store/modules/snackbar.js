// Manages state of the snackbar
export const state = {
  content: '',
  color: ''
}

export const mutations = {
  UPDATE_SNACKBAR (state, payload){
    state.content = payload.content
    state.color = payload.color
  }
}

export const actions = {
  showSnackbar({ commit }, payload) {
    commit('UPDATE_SNACKBAR', payload)
  }
}

export const getters = {
}