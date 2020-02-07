import Vuex from 'vuex'
import Vue from 'vue'
import EventService from '@/services/EventService.js'

Vue.use(Vuex)

export default new Vuex.Store({
  // similar to data of a Vue instance
  state: {
    user: { id: 'abc123', name: 'Anfan Li'},
    chars: []
  },
  // used to commit + track state changes
  // best practice: use actions to call mutations to change the state
  // mutations can be rolled back to do time-travel debugging
  mutations: {
    ADD_STRING(state, value) {
      state.chars.push(value)
    },
    PULL_FROM_DATABASE(state){
      EventService.getCharacters()
      .then(response => {
        state.chars = response.data
      })
      .catch(error => {
        console.log('There was an error with fetching the data:', error.response)
      })
    }
  
  },
  
  // actions call mutations to change the Vuex state
  actions: {
    updateString({ state, commit}, value) {
      if (state.user) {
        commit('ADD_STRING', value)
      }
    },
    updateData() {
      this.commit('PULL_FROM_DATABASE')
    }
  },
  // getters can access our state (similar to computed properties)
  getters: {
    charCount: state => {
      return state.chars.length
    }
  },
  
  
  
});