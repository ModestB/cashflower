import { createRouter, createWebHistory } from 'vue-router';
import Welcome from '@/views/Welcome.vue';
import Authentication from '@/views/authentication/Authentication.vue';
import Regsitration from '@/views/authentication/Registration.vue';
import Login from '@/views/authentication/Login.vue';

const routes = [
  {
    path: '/',
    name: 'Welcome',
    component: Welcome,
  },
  {
    path: '/auth',
    name: 'Authentication',
    component: Authentication,
    children: [
      {
        path: 'registration',
        component: Regsitration,
      },
      {
        path: 'login',
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
