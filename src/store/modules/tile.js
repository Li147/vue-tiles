import firebase from '@/firebaseConfig.js'

export const namespaced = true

export const state = {
  chars: [],
  tiles: []
}
// used to commit + track state changes
// best practice: use actions to call mutations to change the state
// mutations can be rolled back to do time-travel debugging
export const mutations = {
  ADD_TILE(state, value) {
    state.tiles.push(value)
  },
  UPDATE_TILE_STATE(state, value) {
    state.tiles = value
  }
}

// Use actions to make the backend API calls, then commit mutations to update local state
// Actions are meant to be asynchronous
export const actions = {

  // Requests data from firebase and updates local state
  fetchTilesFirebase({commit}) {
    return firebase.tileCollection
      .where("creator", "==", "anfan")
      .get()
      .then(function(querySnapshot) {
        var tiles = []
        querySnapshot.forEach(function(doc) {
          tiles.push(doc.data())
          console.log(doc.id, " => ", doc.data())
          commit('UPDATE_TILE_STATE', tiles)
        })
      })
      .catch(function(error) {
        console.log("Error getting documents: ", error)
      })
  },

  addTileDatabase({commit}, tileData){
    return firebase.tileCollection
      .add(tileData)
      .then(
        commit('ADD_TILE', tileData)
      )
  }
}

// getters can access our state (similar to computed properties)
export const getters = {
  charCount: state => {
    return state.chars.length
  }
}