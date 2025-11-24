module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/data/**/*.{js,ts,jsx,tsx,json}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"],
        display: ["Poppins", "ui-sans-serif", "system-ui"],
        mono: ["Fira Code", "monospace"],
      },
      colors: {
        brand: {
          DEFAULT: "#2563eb",   // main blue
          dark: "#1e40af",
          light: "#3b82f6",
        },
        accent: {
          DEFAULT: "#f97316",   // orange
          dark: "#c2410c",
          light: "#fb923c",
        }
      },
      boxShadow: {
        card: "0 8px 30px rgba(0,0,0,0.12)",
      }
    },
  },
  plugins: [],
};
