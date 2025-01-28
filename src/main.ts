import '@/style/main.sass'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'

import App from './App.vue'
import ErrorView from '@/views/ErrorView.vue'
import CalendarView from '@/views/CalendarView.vue'

const app = createApp(App)

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      name: 'Calendar',
      path: '/:cal(\\d*)',
      component: CalendarView,
    },
    {
      path: '/error',
      name: 'ErrorOccurred',
      component: ErrorView,
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: ErrorView,
    },
  ],
})

app.use(createPinia())
app.use(router)

app.mount('#app')
