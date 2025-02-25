import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        text: "var(--text)",
        extra: "var(--extra)",
        extraa: "var(--extraa)",
        extraaa: "var(--extraaa)",
      },
    },
  },
  plugins: [],
} satisfies Config;
