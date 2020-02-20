import Vue from 'vue'
import App from './App.vue'
import router from './router/router.js'
import store from './store/store.js'
import vuetify from './plugins/vuetify';
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import firebase from 'firebase/app'

Vue.config.productionTip = false

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCkXdNwxkGhiTi5y8FQQdoq9EZa3gKvew0",
  authDomain: "vue-tiles.firebaseapp.com",
  databaseURL: "https://vue-tiles.firebaseio.com",
  projectId: "vue-tiles",
  storageBucket: "vue-tiles.appspot.com",
  messagingSenderId: "532009888547",
  appId: "1:532009888547:web:8fd5e2f6b2b43ad0e33a96"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Observer - auth() object shows whether users or signed in or not
firebase.auth().onAuthStateChanged(user => {
  store.dispatch("fetchUser", user);
})


new Vue({
  //this injects store into all components so they have direct access to it
  store,
  router,
  vuetify,
  render: h => h(App),
}).$mount('#app')
