import Vue from 'vue'
import VueRouter from 'vue-router'
import index from '../views/index.vue'
import Register from '../views/Register'
import Login from '../views/Login.vue';
import Notfound from '../views/404.vue'
import Home from '../views/Home.vue';
import ShowInfo from '../views/ShowInfo.vue';
import FoudList from '../views/FoudList.vue';

Vue.use(VueRouter)

const routes = [{
    path: '/',
    redirect: '/index',
  },
  {
    path: '/index',
    // name: 'index',
    component: index,
    children: [{
        path: '',
        component: Home
      },
      {
        path: '/home',
        name: 'home',
        component: Home
      },
      {
        path: '/showinfo',
        name: 'showinfo',
        component: ShowInfo
      },
      {
        path: '/foundlist',
        name: 'foundlist',
        component: FoudList
      },
    ]
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '*',
    name: '404',
    component: Notfound
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 路由守卫
router.beforeEach((to, from, next) => {
  // 判断是否有token
  const isLogin = localStorage.userToken ? true : false
  if (to.path == '/login' || to.path == '/register') {
    next()
  } else {
    isLogin ? next() : next('/login')
  }
})

export default router