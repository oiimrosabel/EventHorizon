// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  future: {
    compatibilityVersion: 4,
  },
  vite: {
    css: {
      preprocessorOptions: {
        sass: {
          api: "modern-compiler",
        },
      },
    },
  },
  app: {
    head: {
      htmlAttrs: {
        lang: "en",
      },
      title: "EventHorizon",
      meta: [
        { charset: "utf-8" },
        {
          name: "description",
          content: "Un wrapper AdeCampus fait en TypeScript.",
        },
        { property: "og:title", content: "EventHorizon" },
        {
          property: "og:description",
          content: "Un wrapper AdeCampus fait en TypeScript.",
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
  css: ["~/style/main.sass"],
  modules: ["@nuxt/eslint", "@pinia/nuxt"],
  compatibilityDate: "2024-07-04",
});
