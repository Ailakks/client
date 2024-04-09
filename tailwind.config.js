module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        colors: {
            black: {
                DEFAULT: '#000000'
            },
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
                300: '#1a1a1a',
                500: '#101010',
                700: '#0c0c0c',
                900: '#000000'
            }
        },
        borderWidth: {
            1: '1px'
        },
        divideWidth: {
            1: '1px',
            2: '2px'
        }
    },
    variants: {
        extend: {},
    },
    plugins: [],
};
