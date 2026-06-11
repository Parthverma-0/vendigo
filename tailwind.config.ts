import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Seamless void — matches the pure-black frame backgrounds.
        void: "#000000",
        ink: "#060607",
        panel: "#0C0C0E",
        gold: {
          DEFAULT: "#E9B44C",
          light: "#F6CE7A",
        },
        emerald: {
          gain: "#2BD673",
        },
      },
      fontFamily: {
        sans: [
          "Inter",
          "SF Pro Display",
          "SF Pro Text",
          "system-ui",
          "sans-serif",
        ],
      },
      letterSpacing: {
        tightest: "-0.045em",
      },
    },
  },
  plugins: [],
};

export default config;
