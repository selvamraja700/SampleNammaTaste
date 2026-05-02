export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#facc15",
        secondary: "#050505",
        dark: "#0a0a0a",
        card: "#111111",
        border: "#262626"
      },
      fontFamily: {
        heading: ["Outfit", "sans-serif"],
        body: ["Inter", "sans-serif"]
      }
    }
  },
  plugins: []
};
