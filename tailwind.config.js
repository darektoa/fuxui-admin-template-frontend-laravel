const { nextui } = require('@nextui-org/react');

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        'resources/js/**/*.{js,jsx,ts,tsx}',
        'resources/views/**/*.blade.php',
        './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
    ],
    darkMode: ['class', 'selector', '[data-theme="dark"]'],
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
                    '50': '#eff6ff',
                    '100': '#e0f2fe',
                    '200': '#bae6fd',
                    '300': '#7dd3fc',
                    '400': '#60a5fa',
                    '500': '#3b82f6',
                    '600': '#2563eb',
                    '700': '#1d4ed8',
                    '800': '#1e40af',
                    '900': '#1e3a8a',
                    '950': '#172554',
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
    plugins: [
        require('daisyui'),
        nextui({
            prefix: "nextui", // prefix for themes variables
            addCommonColors: false, // override common colors (e.g. "blue", "green", "pink").
            defaultTheme: "light", // default theme from the themes object
            defaultExtendTheme: "light", // default theme to extend on custom themes
            layout: {}, // common layout tokens (applied to all themes)
            themes: {
                light: {
                    layout: {}, // light theme layout tokens
                    colors: {
                        primary: {
                            '50': '#eff6ff',
                            '100': '#e0f2fe',
                            '200': '#bae6fd',
                            '300': '#7dd3fc',
                            '400': '#60a5fa',
                            '500': '#3b82f6',
                            '600': '#2563eb',
                            '700': '#1d4ed8',
                            '800': '#1e40af',
                            '900': '#1e3a8a',
                            '950': '#172554',
                            DEFAULT: '#1e40af',
                        },
                    }, // light theme colors
                },
                dark: {
                    layout: {}, // dark theme layout tokens
                    colors: {
                        primary: {
                            '50': '#eff6ff',
                            '100': '#e0f2fe',
                            '200': '#bae6fd',
                            '300': '#7dd3fc',
                            '400': '#60a5fa',
                            '500': '#3b82f6',
                            '600': '#2563eb',
                            '700': '#1d4ed8',
                            '800': '#1e40af',
                            '900': '#1e3a8a',
                            '950': '#172554',
                            DEFAULT: '#1e40af',
                        },
                    }, // dark theme colors
                }
            }
        }),
    ],
    daisyui: {
        themes: [
            {
                light: {
                    ...require("daisyui/src/theming/themes")["light"],
                    accent: "#1e40af",
                    primary: "#2563eb",
                    secondary: "#9ca3af",
                },
            },
            {
                dark: {
                    ...require("daisyui/src/theming/themes")["dark"],
                    accent: "#1e40af",
                    primary: "#2563eb",
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
