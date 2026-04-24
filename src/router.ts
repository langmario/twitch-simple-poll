import { createRouter, createWebHistory } from 'vue-router'
import OverlayView from './views/OverlayView.vue'
import DemoView from './views/DemoView.vue'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/demo',
      component: DemoView,
    },
    {
      path: '/:channel',
      component: OverlayView,
    },
  ],
})
