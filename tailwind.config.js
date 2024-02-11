module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        colors: {
            transparent: {
                DEFAULT: 'rgba(0,0,0,0)',
            },
            blue: {
                500: '#1472ff',
                700: '#0160F0',
                900: '#182444'
            },
            white: {
                DEFAULT: '#ffffff'
            },
            gray: {
                100: '#c2c0c9',
                300: '#3a3a3b',
                500: '#2c2c30',
                700: '#18181b',
                900: '#111111'
            }
        }
    },
    variants: {
        extend: {},
    },
    plugins: [],
};
