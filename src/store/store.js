import Vuex from 'vuex'
import Vue from 'vue'

// * means import all public items into user namespace
import * as user from '@/store/modules/user.js'
import * as tile from '@/store/modules/tile.js'
import * as snackbar from '@/store/modules/snackbar.js'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user, 
    tile,
    snackbar
  },
})