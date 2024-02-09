module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        colors: {
            white: {
                DEFAULT: '#ffffff'
            },
            gray: {
                300: '#2c2c30',
                500: '#18181b',
                700: '#111111'
            }
        }
    },
    variants: {
        extend: {},
    },
    plugins: [],
};
