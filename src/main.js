import Vue from 'vue'
import App from './App.vue'
import router from './router/router.js'
import store from './store/store.js'
import vuetify from './plugins/vuetify';
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import firebase from './firebaseConfig.js'

Vue.config.productionTip = false

// Observer - auth() object shows whether users or signed in or not
firebase.auth.onAuthStateChanged(function(user) {
  // user is signed in
  if (user) {
    store.dispatch("login", user)
      .then(() => {
        // If login successfull, pull files from database
        store.dispatch('tile/fetchTilesFirebase')
      })
  } else {
    console.log('hello from the else condition')
  }
})

new Vue({
  //this injects store into all components so they have direct access to it
  store,
  router,
  vuetify,
  render: h => h(App),
}).$mount('#app')
