/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        surface: "var(--surface)",
        "surface-muted": "var(--surface-muted)",
        "surface-hover": "var(--surface-hover)",

        text: "var(--text)",
        "text-muted": "var(--text-muted)",

        border: "var(--border)",
        input: "var(--input)",

        primary: "var(--primary)",
        "primary-hover": "var(--primary-hover)",
        "primary-soft": "var(--primary-soft)",

        secondary: "var(--secondary)",
        "secondary-hover": "var(--secondary-hover)",

        success: "var(--success)",
        error: "var(--error)",
      },

      backgroundImage: {
        "accent-gradient": "var(--accent-gradient)",
      },

      borderRadius: {
        xl2: "18px",
      },

      boxShadow: {
        soft: "0 10px 30px rgba(0,0,0,0.08)",
        glow: "0 0 20px rgba(124, 58, 237, 0.4)",
      },
    },
  },
  plugins: [],
};