import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";
export default <Partial<Config>>{
    theme: {
        extend: {
            fontFamily: {
                sans: ["Montserrat", "sans-serif"],
                serif: ["Literata", "serif"],
            },
            fontSize: {
                "3xl": "2rem",
                "10rem": "10rem",
            },
            spacing: {
                "18": "4.5rem",
            },
        },
    },
};
