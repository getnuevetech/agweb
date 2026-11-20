import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          base: "#17366A",
          deep: "#0B2447",
          light: "#244B80",
        },
        gold: {
          DEFAULT: "#D9A441",
          light: "#F1CB75",
        },
        surface: {
          cool: "#F5F7FB",
        },
        ink: {
          DEFAULT: "#13233B",
          muted: "#526176",
        },
        line: "#DCE3ED",
        danger: "#B42318",
        success: "#176B45",
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      maxWidth: {
        content: "1200px",
      },
      boxShadow: {
        card: "0 8px 24px rgba(11, 36, 71, 0.06)",
      },
    },
  },
  plugins: [],
};

export default config;
