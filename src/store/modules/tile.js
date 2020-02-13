import EventService from '@/services/EventService.js'

export const namespaced = true

export const state = {
  chars: []
}
// used to commit + track state changes
// best practice: use actions to call mutations to change the state
// mutations can be rolled back to do time-travel debugging
export const mutations = {
  ADD_TILE(state, value) {
    state.chars.push(value)
  },
  PULL_FROM_DATABASE(state, response){
    state.chars = response.data
  }
}

// actions call mutations to change the Vuex state, actions are meant to be asynchronous
export const actions = {
  updateTile({ commit }, tile) {
    // wait axios call to finish, THEN commit the changes
    return EventService.addTile(tile).then(() => {
      commit('ADD_TILE', tile)
    })
  },
  updateData() {
    return EventService.getCharacters().then(response => {
      this.commit('tile/PULL_FROM_DATABASE', response)
    })
    .catch(error => {
      console.log('There was an error with fetching the data:', error.response)
    })
  }
}

// getters can access our state (similar to computed properties)
export const getters = {
  charCount: state => {
    return state.chars.length
  }
}