/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            colors: {
                primary: '#0d253f', // dark blue
                secondary: '#01b4e4', // light blue
                tertiary: '#90cea1' // light green
            }
        },
    },
    plugins: [],
}