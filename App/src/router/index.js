import { createRouter, createWebHistory } from 'vue-router';
import Personagens from '../views/Personagens.vue';
import Comics from '../views/Comics.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Personagens
    },
    {
      path: '/Comics',
      name: 'Comics',
      component: Comics
    }
  ]
})

export default router
