import Vue from 'vue';
import Router from 'vue-router'
import Home from '@/views/Home'
import HelloWorld from '@/views/HelloWorld'

Vue.use(Router)

export default new Router({
    routes: [
      {
        path: '/', 
        name: 'home',
        component: Home
      },
      {
        path: '/vuetify',
        name: 'vuetify',
        component: HelloWorld 
      }
    ],
    mode: 'history'
})