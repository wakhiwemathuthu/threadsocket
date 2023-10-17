/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html","./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "purple-900": "#19171d",
        "black-800": "#1a1d21",
        "blue-400": "#1164a3",
        "blue-50": "#27242c",
        "black-backdrop": "rgba(0,0,0,0.6)",
        "black-50": "#2b2a2f",
        "black-200": "#222529",
        "green-100": "#273435",
        "green-200": "#148567",
        "gray-300": "#908f93",
        "gray-200": "#d1d2d3",
        "black-100": "#35373b",
        "gray-100": "#3e3d42",
      },
    },
  },
  plugins: [],
}

