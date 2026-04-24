import { createRouter, createWebHistory } from 'vue-router'
import PollView from './views/PollView.vue'
import HomeView from './views/HomeView.vue'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: HomeView,
    },
    {
      path: '/:channel',
      component: PollView,
    },
  ],
})
