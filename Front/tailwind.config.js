/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            width: {
                '30.5': '122px',
                '11/14': '78.5%',
                '17/100': '17%'
            },
            scale: {
                '101': '1.01',
            },
            top: {
                '18': '4.5rem'
            },
            height: {
                '40vh': '40vh',
                '45vh': '45vh',
                '55vh': '55vh',
                '60vh': '60vh',
            }
        },
    },
    variants: {
        extend: {
            scale: ['hover'],
        },
    },
    plugins: [],
}

