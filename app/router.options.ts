import type { RouterConfig } from "@nuxt/schema";
import CalendarPage from "~/pages/CalendarPage.vue";

export default {
  // https://router.vuejs.org/api/interfaces/routeroptions.html#routes
  routes: (_routes) => [
    {
      name: "Index",
      path: "/",
      component: CalendarPage,
    },
    {
      name: "Calendar",
      path: "/:cal",
      component: CalendarPage,
      meta: {
        validate: (route) => {
          const cal = route.params["cal"];
          return !cal || (typeof cal === "string" && /^\d+$/.test(cal));
        },
      },
    },
  ],
} satisfies RouterConfig;
