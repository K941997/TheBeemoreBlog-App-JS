module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          light: "#fefcbf", // For lighter primary color
          DEFAULT: "#3b82f6", // Normal primary color
          dark: "#1d4ed8", // Used for hover, active, etc.
        },
      },
    },
  },
  plugins: [require("kutty")],
};
