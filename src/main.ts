import './assets/style/main.sass'

import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'
import WelcomeView from '@/views/WelcomeView.vue'
import CalendarsView from '@/views/CalendarsView.vue'
import NotFoundView from '@/views/NotFoundView.vue'

const app = createApp(App)

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/:pathMatch(.*)*',
      name: 'notFound',
      component: NotFoundView
    },
    {
      path: '/',
      name: 'home',
      component: WelcomeView
    },
    {
      path: '/:cal',
      name: 'calendar',
      component: CalendarsView
    }
  ]
})

app.use(router)

app.mount('#app')
