/** @type {import('tailwindcss').Config} */
module.exports = {
  variants: {
    extend: {
      pointerEvents: ["group-hover"],
    },
  },
  content: ["./app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "bg-dark": "#0e1016",
        "t-color": "#9AC2FF",
        cover50: "rgb(14 16 22 / 0.5)",
        main: "#9AC2FF",
        secondary: "#0754CA",
      },
      linearGradients: {
        "bg-top": ["180deg", "#9AC2FF 0%", "transparent 50%"],
        "bg-bottom": ["0deg", "#9AC2FF 0%", "transparent 100%"],
      },
      keyframes: {
        gradientMove: {
          "0%": { stopColor: "#fffaf8", offset: "15%" },
          "100%": { stopColor: "#9AC2FF", offset: "100%" },
        },
        reverseGradientMove: {
          gradientMove: {
            "0%": { stopColor: "#fffaf8", offset: "100%" },
            "100%": { stopColor: "#9AC2FF", offset: "25%" },
          },
        },
      },
      animation: {
        gradientMove: "gradientMove 3s infinite alternate",
        reverseGradientMove: "reverseGradientMove 3s infinite alternate",
        slowspin: "spin 15s linear infinite",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
