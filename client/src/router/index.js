import { createRouter, createWebHistory } from 'vue-router';
import Authentication from '@/views/authentication/Authentication.vue';
import Regsitration from '@/views/authentication/Registration.vue';
import Login from '@/views/authentication/Login.vue';
import Dashboard from '@/views/Dashboard.vue';
import Admin from '@/views/Admin.vue';
import Profile from '@/views/Profile.vue';

import { LOCAL_STORAGE_USER_KEY } from '@/constants';

const routes = [
  {
    path: '/',
    name: 'Welcome',
    redirect: '/auth/registration',
  },
  {
    path: '/auth',
    name: 'Authentication',
    component: Authentication,
    children: [
      {
        path: 'registration',
        name: 'Regitration',
        component: Regsitration,
        meta: {
          guest: true
        }
      },
      {
        path: 'login',
        name: 'Login',
        component: Login,
        meta: {
          guest: true
        }
      }
    ]
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin,
    meta: {
      requiresAuth: true,
      is_admin: true
    }
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});


// Meta Handling
// More info https://www.digitalocean.com/community/tutorials/how-to-set-up-vue-js-authentication-and-route-handling-using-vue-router
router.beforeEach((to, from, next) => {
  const user = JSON.parse(localStorage.getItem(LOCAL_STORAGE_USER_KEY))
  const token = user?.accessToken.token;
  const loggedIn = token && new Date(user?.accessToken.expireAt) > new Date();

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!loggedIn) {
      next({
        name: 'Login',
        params: { nextUrl: to.fullPath }
      })
    } else if (to.matched.some(record => record.meta.is_admin)) {
      if (user.is_admin === 1) {
        next()
      } else {
        next({ name: 'dashboard' })
      }
    } else {
      next()
    }
  } else if (to.matched.some(record => record.meta.guest && loggedIn)) {
    console.log('DASH')
    next({ name: 'dashboard' })
  } else {
    console.log('Else')
    next()
  }
})

export default router;
