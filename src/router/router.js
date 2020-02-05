import Vue from 'vue';
import Router from 'vue-router'
import Home from '@/views/Home'

Vue.use(Router)

export default new Router({
    routes: [
      {
        path: '*', 
        redirect: '/'
      },
      {
        path: '/', 
        name: 'home',
        component: Home
      },
      {
        path: '/login',
        name: 'login',
        component: () => import('@/views/Login.vue') 
      },
      {
        path: '/dashboard',
        name: 'dashboard',
        component: () => import('@/views/Dashboard.vue') 
      },
      {
        path: '/signup',
        name: 'signup',
        component: () => import('@/views/Signup.vue') 
      }
    ],
    mode: 'history'
})