import { createRouter, createWebHistory } from 'vue-router';

const routeOptions = [
  {
    path: '/login',
    name: 'LoginPage',
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/signup',
    name: 'SignupPage',
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/user/:id',
    name: 'UserProfile',
    meta: {
      requiresAuth: true
    }
  },
  { 
    path: '/:pathMatch(.*)*', 
    name: 'LoginPage',
    meta: {
      requiresAuth: false
    }
  },
];

const routes = routeOptions.map((route) => {
  return {
    ...route,
    component: () =>
      import(/* webpackChunkName: "[request]" */ `../pages/${route.name}.vue`),
  };
});

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

// router.beforeEach((to, from) => {
//   if (to.meta.requiresAuth) {
//     return {
//       path: '/login',
//       query: { redirect: to.fullPath },
//     }
//   }
// })

export default router;

