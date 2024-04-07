module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        colors: {
            black: {
                DEFAULT: '#464646'
            },
            transparent: {
                DEFAULT: 'rgba(0,0,0,0)',
            },
            blue: {
                300: '#c0efbc',
                500: '#74E66A',
                700: '#5EE65C',
                900: '#50E55F'
            },
            white: {
                DEFAULT: '#343434'
            },
            gray: {
                100: '#c2c0c9',
                300: '#d0e5d0',
                500: '#e5e4e4',
                700: '#f3f3f3',
                900: '#ececec'
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
