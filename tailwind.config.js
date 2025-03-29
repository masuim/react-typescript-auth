/** @type {import('tailwindcss').Config} */
export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        page: {
          bg: "var(--page-background)",
          "bg-dark": "var(--page-background-dark)",
        },
        card: {
          bg: "var(--card-background)",
          "bg-dark": "var(--card-background-dark)",
        },
      },
      boxShadow: {
        card: "var(--card-shadow)",
      },
      borderRadius: {
        card: "var(--card-border-radius)",
      },
    },
  },
};

