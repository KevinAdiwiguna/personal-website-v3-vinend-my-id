import type { Config } from "tailwindcss";

export default {
	darkMode: "selector",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
    animation: {
      ping: "ping 1s cubic-bezier(0, 0, 0.2, 1) infinite",
      "infinite-scroll": "infinite-scroll 60s linear infinite",
    },
    keyframes: {
      "infinite-scroll": {
        from: { transform: "translateX(0)" },
        to: { transform: "translateX(-100%)" },
      },
      ping: {
        "0%": { transform: "scale(1)", opacity: "1" },
        "75%, 100%": { transform: "scale(2)", opacity: "0" },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
} satisfies Config;
