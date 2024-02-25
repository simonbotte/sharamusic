// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: {
        enabled: true,

        timeline: {
            enabled: true,
        },
    },
    modules: ["@nuxtjs/i18n"],
    css: ["~/assets/css/main.css", "~/assets/css/fonts.css"],
    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
        },
    },
    i18n: {
        locales: ["fr", "us", "de", "it"],
        defaultLocale: "fr",
        vueI18n: "./i18n.config.ts",
        strategy: "prefix_except_default",
        detectBrowserLanguage: {
            useCookie: true,
            cookieKey: "i18n_redirected",
            alwaysRedirect: true,
            fallbackLocale: "us",
        },
    },
    runtimeConfig: {
        APPLE_TEAM_ID: process.env.APPLE_TEAM_ID,
        APPLE_KEY_ID: process.env.APPLE_KEY_ID,
        APPLE_PRIVATE_KEY: process.env.APPLE_PRIVATE_KEY,
    },
});
