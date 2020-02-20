import Vue from 'vue';
import VueRouter from 'vue-router'
import Home from '@/views/Home'
import * as firebase from "firebase/app"
import "firebase/auth"

Vue.use(VueRouter)

const router = new VueRouter({
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
      path: '/signup',
      name: 'signup',
      component: () => import('@/views/Signup.vue'),
      meta: {requiresAuth: true}
    }
  ],
  mode: 'history'
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const isAuthenticated = firebase.auth().currentUser
  if (requiresAuth && !isAuthenticated){
    next("/login")
  } else {
    next()
  }
})

export default router




