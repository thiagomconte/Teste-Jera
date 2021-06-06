import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Profile from '../views/Profile.vue'
import Main from '../views/Main.vue'
import Home from '../views/Home.vue'
import Register from '../views/Register.vue'
import MyList from '../views/MyList.vue'
import {isAuth, isGuest, isAuthAndProfile} from './routerGuard'

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
        path:'/profile',
        component: Profile,
        beforeEnter: isAuth
      },
      {
        path: '/home',
        component: Home,
        beforeEnter: isAuthAndProfile
      },
      {
        path: '/mylist',
        component: MyList,
        beforeEnter: isAuthAndProfile
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
