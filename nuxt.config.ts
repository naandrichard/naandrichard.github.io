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
});
