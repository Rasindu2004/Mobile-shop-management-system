/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
        colors:{
            primary:"#f42c37",
            secondrary:"#f42c37",
            brandyellow:"#fdc62e",
            brandgreen:"#2dcc6f",
            brandblue:"#1376f4",
            brandwhite:"#ffffff",

        },
        container:{
            center: true,
            padding:{
                DEFAULT:"1rem",
                sm: "3rem",
            },
        }
    },
  },
  plugins: [],
}