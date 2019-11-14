import Vue from 'vue'
import VueRouter from 'vue-router'
import Movies from '../views/Movies'
import Signup from '../views/Signup'
import Login from '../views/Login'
import Settings from '../views/Settings'
import Store from '../store/index'
import Movie from '../views/Movie'
import Chat from '../views/Chat'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'movies',
    component: Movies
  },
  {
    path: '/signup',
    name: 'signup',
    component: Signup
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/settings',
    name: 'settings',
    component: Settings,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/movies/movie/:id',
    name: 'movie',
    component: Movie,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/chat',
    name: 'chat',
    component: Chat,
    meta: {
      requiresAuth: true
    }
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (Store.state.errorMsg) {
    Store.commit('SET_ERROR_MSG', '');
  }
  if (Object.entries(Store.state.loggedUser).length === 0 && Store.state.loggedUser.constructor === Object) {
    if (localStorage.getItem('jwt')) {
      localStorage.removeItem('jwt');
    }
  }
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (localStorage.getItem('jwt') === null) {
      next({
        name: 'login'
      });
    } else {
      next();
    }
  } else {
    if (localStorage.getItem('jwt') === null) {
      next();
    } else {
      if (to.name === 'login' || to.name === 'signup') {
        next({
          name: 'movies'
        });
      } else {
        next();
      }
    }
  }
})

export default router