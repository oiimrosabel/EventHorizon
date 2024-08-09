// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  future: {
    compatibilityVersion: 4,
  },
  app: {
    head: {
      htmlAttrs: {
        lang: "en",
      },
      title: "EventHorizon",
      meta: [
        { charset: "utf-8" },
        { name: "description", content: "Parce que AdeCampus est horrible." },
        { property: "og:title", content: "EventHorizon" },
        {
          property: "og:description",
          content: "Parce que AdeCampus est horrible.",
        },
        { name: "viewport", content: "width=device-width, initial-scale=1.0" },
      ],
      link: [
        {
          rel: "preconnect",
          crossorigin: "anonymous",
          href: "https://fonts.googleapis.com/",
        },
        {
          rel: "icon",
          href: "/meta/favicon.png",
        },
      ],
    },
  },
  css: ["@/assets/style/main.sass"],
  modules: ["@nuxt/eslint"],
  compatibilityDate: "2024-07-04",
});
