import Vue from 'vue'
import App from './App.vue'
import router from './router/router.js'
import store from './store/store.js'
import vuetify from './plugins/vuetify';
import 'material-design-icons-iconfont/dist/material-design-icons.css'

Vue.config.productionTip = false

new Vue({
  //this injects store into all components so they have direct access to it
  store,
  router,
  vuetify,
  render: h => h(App),
}).$mount('#app')
