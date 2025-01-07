import { nextui } from '@nextui-org/react';
import daisyui from 'daisyui';
import themes from 'daisyui/src/theming/themes';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        'resources/js/**/*.{js,jsx,ts,tsx}',
        'resources/views/**/*.blade.php',
        './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
    ],
    darkMode: ['class', 'selector', '[data-theme="dark"]'],
    theme: {
        extend: {
            backgroundImage: {
                'gradient-primary': 'linear-gradient(135deg, rgba(29, 78, 216, var(--tw-bg-opacity)) 0%, rgba(37, 99, 235, var(--tw-bg-opacity)) 55%, rgba(59, 130, 246, var(--tw-bg-opacity)) 100%)',
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
                    DEFAULT: '#3b82f6',
                },
            },
            maxHeight: {
                '7xl': '1280px',
                '6xl': '1152px',
                '5xl': '1024px',
                '4xl': '896px',
                '3xl': '768px',
                '2xl': '672px',
                'xl': '576px',
                'lg': '512px',
                'md': '448px',
                'sm': '384px',
                'xs': '320px',
                '2xs': '280px',
                '3xs': '240px',
            },
            maxWidth: {
                '2xs': '280px', // 290px
                '3xs': '240px',
            },
            screens: {
                '2xs': '320px',
                'xs': '425px',
            },
        },
    },
    plugins: [
        daisyui,
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
                            foreground: '#fff',
                            background: '#3b82f6',
                            DEFAULT: '#3b82f6',
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
                    ...themes["light"],
                    accent: "#1e40af",
                    primary: "#2563eb",
                    secondary: "#9ca3af",
                },
            },
            {
                dark: {
                    ...themes["dark"],
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
