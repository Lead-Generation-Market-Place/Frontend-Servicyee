// tailwind.config.js
module.exports = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './pages/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          darkest: "#023E8A",  // Primary headers, buttons
          dark: "#0077B6",     // Button background
          DEFAULT: "#0096C7",  // Brand default
          light: "#00B4D8",    // Button hover
          lighter: "#90E0EF",  // Card backgrounds
          soft: "#ADE8F4",     // Section backgrounds
          pale: "#CAF0F8",     // Lightest areas
        },

        success: {
          DEFAULT: "#22C55E",   // Green-500
          light: "#BBF7D0",     // Green-100
          dark: "#15803D",      // Green-800
        },
        warning: {
          DEFAULT: "#F59E0B",   // Amber-500
          light: "#FEF3C7",     // Amber-100
          dark: "#B45309",      // Amber-800
        },
        error: {
          DEFAULT: "#EF4444",   // Red-500
          light: "#FECACA",     // Red-100
          dark: "#B91C1C",      // Red-800
        },
        info: {
          DEFAULT: "#3B82F6",   // Blue-500
          light: "#DBEAFE",     // Blue-100
          dark: "#1E3A8A",      // Blue-900
        },

        // Neutral Grays (optional override)
        neutral: {
          50: "#F9FAFB",
          100: "#F3F4F6",
          200: "#E5E7EB",
          300: "#D1D5DB",
          400: "#9CA3AF",
          500: "#6B7280",
          600: "#4B5563",
          700: "#374151",
          800: "#1F2937",
          900: "#111827",
        },
      },
    },
  },
  plugins: [],
};
