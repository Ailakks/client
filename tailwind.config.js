module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                gray: {
                    100: '#0a0a0a',
                    300: '#111111',
                    500: '#181818',
                    600: '#1c1c1c',
                    700: '#212121',
                    800: '#cccccc',
                    900: "#e8e8e8"
                }
            }
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
};
