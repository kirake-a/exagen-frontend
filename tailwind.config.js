/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['selector', '[data-theme="dark"]'],
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/primereact/**/*.{js,ts,jsx,tsx}',
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: { extend: {} },
  plugins: [],
};
