const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", ...defaultTheme.fontFamily.sans],
      },
      boxShadow: {
        soft: "0 18px 50px rgba(0, 0, 0, 0.08)",
        apple: "0 20px 50px rgba(0, 0, 0, 0.10)",
      },
      colors: {
        apple: {
          primary: "#0071E3",
          link: "#0066CC",
          linkDark: "#2997FF",
          surface: "#FFFFFF",
          secondary: "#F5F5F7",
          nav: "#FAFAFC",
          dark: "#000000",
          text: "#1D1D1F",
          muted: "#86868B",
          hairline: "#D2D2D7",
          error: "#E30000",
          success: "#008009",
        },
      },
    },
  },
  plugins: [],
};
