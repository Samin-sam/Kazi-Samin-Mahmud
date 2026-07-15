import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        kanit: ["Kanit", "sans-serif"]
      },
      colors: {
        ink: "#0C0C0C",
        mist: "#D7E2EA",
        whiteSection: "#FFFFFF"
      },
      boxShadow: {
        glow: "0 0 60px rgba(182, 0, 168, 0.26)",
        glass: "0 30px 90px rgba(0, 0, 0, 0.38)"
      }
    }
  },
  plugins: []
} satisfies Config;
