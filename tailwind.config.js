/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      lightBlue: "#87CEFA",
      lightGrey: "#D3D3D3",
      blue: "#0000FF",
      white: "#FFFFFF",
      black: "#000000",
    }
  },
  plugins: [],
}

