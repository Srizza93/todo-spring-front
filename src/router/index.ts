import { createRouter, createWebHistory } from 'vue-router';
import { useStateUserStore } from '../store/StateUser'

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
    path: '/user',
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

router.beforeEach((to, from) => {
  const store = useStateUserStore()
  if (to.meta.requiresAuth && !store.$state.loggedIn) {
    return {
      path: '/login',
      query: { redirect: to.fullPath },
    }
  }
})

export default router;

