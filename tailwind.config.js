/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        'resources/js/**/*.{js,jsx,ts,tsx}',
        'resources/views/**/*.blade.php',
    ],
    darkMode: ['selector', '[data-theme="dark"]'],
    theme: {
        extend: {
            backgroundImage: {
                'gradient-primary': 'linear-gradient(135deg, rgba(12, 127, 22, var(--tw-bg-opacity)) 0%, rgba(9, 167, 17, var(--tw-bg-opacity)) 55%, rgba(17, 209, 23, var(--tw-bg-opacity)) 100%)',
            },
            borderRadius: {
                '4xl': '36px',
                '5xl': '52px',
            },
            colors: {
                primary: {
                    '50': '#e7ffe6',
                    '100': '#cbfdca',
                    '200': '#9cfb9b',
                    '300': '#60f661',
                    '400': '#20e924',
                    '500': '#11d118',
                    '600': '#09a711',
                    '700': '#0c7f15',
                    '800': '#106417',
                    '900': '#125519',
                    '950': '#042f0a',
                },
            },
            maxWidth: {
                '2xs': '280px',
                '3xs': '240px',
            },
            screens: {
                '2xs': '320px',
                'xs': '425px',
            },
        },
    },
    plugins: [require('daisyui')],
    daisyui: {
        themes: [
            {
                dark: {
                    ...require("daisyui/src/theming/themes")["dark"],
                    accent: "#09a711",
                    primary: "#11d118",
                    secondary: "#9ca3af",
                },
                light: {
                    ...require("daisyui/src/theming/themes")["light"],
                    accent: "#09a711",
                    primary: "#11d118",
                    secondary: "#9ca3af",
                },
            },
        ], // false: only light + dark | true: all themes | array: specific themes like this ["light", "dark", "cupcake"]
        darkTheme: "light", // name of one of the included themes for dark mode
        base: true, // applies background color and foreground color for root element by default
        styled: true, // include daisyUI colors and design decisions for all components
        utils: true, // adds responsive and modifier utility classes
        prefix: "", // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
        logs: true, // Shows info about daisyUI version and used config in the console when building your CSS
        themeRoot: ":root", // The element that receives theme color CSS variables
    },
};
