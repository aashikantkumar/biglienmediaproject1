/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./packages/customer-app/**/*.{js,ts,jsx,tsx,mdx}",
    "./packages/admin-app/**/*.{js,ts,jsx,tsx,mdx}",
    "./packages/food-partner-app/**/*.{js,ts,jsx,tsx,mdx}",
    "./packages/shared-ui/**/*.{js,ts,jsx,tsx,mdx}",
    "./packages/shared-utils/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fff7ed',
          500: '#f97316',
          600: '#ea580c',
          700: '#c2410c',
        },
        secondary: {
          50: '#f0f9ff',
          500: '#0ea5e9',
          600: '#0284c7',
        }
      }
    },
  },
  plugins: [],
}
