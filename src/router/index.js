import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '../views/Dashboard.vue'

import { auth } from '../firebase'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/*webpackChunkName: "login" */ '../views/Login.vue'),
    
  },
  {
    path: '/settings',
    name: 'Settings',
    component: () => import(/*webpackChunkName: "login" */ '../views/Settings.vue'),
    //This allows us to flag the routes required for a user to be authenticated.
    meta: {
      requiresAuth: true
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})
//Check if the route exists and requires authentication. 
//Next, create a reference to the current user and authenticate routes.
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth)
//Nếu route có requireAuth meta = true  và user chưa đăng nhập -> chuyển tới login
//Nếu có thì sẽ chuyển tới trang mà họ muốn xem.
  if(requiresAuth && !auth.currentUser) {
    next('/login')
  } else {
    next()
  }
})

export default router
