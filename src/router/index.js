import {createRouter, createWebHistory} from 'vue-router'
import Welcome from "@/views/Welcome.vue";
import Calendars from "@/views/Calendars.vue";
import Error from "@/components/Error.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'Welcome',
            component: Welcome
        },
        {
            path: '/:cal',
            name: 'Calendar',
            component: Calendars
        }
    ]
})

export default router
