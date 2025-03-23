/** @type {import('tailwindcss').Config} */
export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#2563eb",
          foreground: "#ffffff",
        },
        destructive: {
          DEFAULT: "#dc2626",
          foreground: "#ffffff",
        },
        secondary: {
          DEFAULT: "#4b5563",
          foreground: "#ffffff",
        },
        accent: {
          DEFAULT: "#f3f4f6",
          foreground: "#111827",
        },
      },
    },
  },
  plugins: [],
};
