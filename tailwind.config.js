/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },

        fadeLeft: {
          "0%": { opacity: "0", transform: "translateX(-30px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },

        fadeRight: {
          "0%": { opacity: "0", transform: "translateX(30px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },

        float: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },

        shimmer: {
          "0%": { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
      },

      animation: {
        fadeUp: "fadeUp .7s ease forwards",
        fadeLeft: "fadeLeft .7s ease forwards",
        fadeRight: "fadeRight .7s ease forwards",
        float: "float 4s ease-in-out infinite",
        shimmer: "shimmer 4s linear infinite",
      },

      fontFamily: {
        inter: ["Inter", "sans-serif"],
        display: ["Syne", "sans-serif"],
        
      },
    },
  },

  plugins: [],
};
