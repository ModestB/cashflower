import { createRouter, createWebHistory } from 'vue-router';
import Authentication from '@/views/authentication/Authentication.vue';
import Regsitration from '@/views/authentication/Registration.vue';
import Login from '@/views/authentication/Login.vue';

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
        name: 'registration',
        component: Regsitration,
      },
      {
        path: 'login',
        name: 'login',
        component: Login,
      }
    ]
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

export default router;
