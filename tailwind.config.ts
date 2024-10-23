import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx, sx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        green200: 'hsl(148, 38%, 91%)', // No hyphen in the name
        green600: 'hsl(169, 82%, 27%)', // No hyphen in the name
        red: 'hsl(0, 66%, 54%)',        // Lowercase and no hyphen
        white: 'hsl(0, 0%, 100%)',      // Lowercase and no hyphen
        grey500: 'hsl(186, 15%, 59%)',  // No hyphen in the name
        grey900: 'hsl(187, 24%, 22%)',  // No hyphen in the name


      },
    },
  },
  plugins: [],
};
export default config; 
