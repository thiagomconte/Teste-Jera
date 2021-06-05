import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Main from '../views/Main.vue'
import Home from '../views/Home.vue'
import Register from '../views/Register.vue'
import {isAuth, isGuest} from './routerGuard'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    component: Login,
    beforeEnter: isGuest
  },
  {
    path: '/register',
    component: Register,
    beforeEnter: isGuest
  },
  {
    path: '/',
    component: Main,
    beforeEnter: isAuth,
    children: [
      {
        path: '/home',
        component: Home,
        beforeEnter: isAuth
      }
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
