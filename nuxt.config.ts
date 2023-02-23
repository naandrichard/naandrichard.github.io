// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: ["@nuxtjs/tailwindcss", "@nuxtjs/google-fonts"],
    tailwindcss: {
        configPath: "tailwind.config.ts",
    },
    googleFonts: {
        download: true,
        base64: true,
        families: {
            Montserrat: [400, 500, 700],
            "Literata:ital,opsz,wght@0,7..72,200;0,7..72,300;0,7..72,400;0,7..72,500;0,7..72,600;0,7..72,700;1,7..72,200;1,7..72,300;1,7..72,400;1,7..72,500;1,7..72,600;1,7..72,700":
                true,
        },
    },
    ssr: false,
    app: {
        head: {
            title: "Na & Richard 💍 2023",
            link: [
                {
                    rel: "icon",
                    type: "image/png",
                    href: "/favicon.png",
                },
            ],
        },
        // Disabling transitions is required for onMounted() to work properly and be called after the page is rendered.
        // See https://github.com/nuxt/nuxt/issues/13471
        pageTransition: false,
        layoutTransition: false,
    },
});
