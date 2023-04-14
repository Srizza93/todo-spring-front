import { createRouter, createWebHistory } from 'vue-router';

const routeOptions = [
  {
    path: '/',
    name: 'LoginPage',
  },
  {
    path: '/user/:id',
    name: 'UserProfile',
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
  history: createWebHistory(),
  routes,
});

export default router;

