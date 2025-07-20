/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        yahei: ['"Microsoft YaHei UI"', 'sans-serif'],
      },
      colors: {
        muted:{
           DEFAULT: '#f5f5f5',  // 或你想用的主色
          50: '#fafafa',       // 浅色，支持 hover:bg-muted/50
          100: '#f0f0f0',
        },
        background: 'var(--white)',
        foreground: 'var(--black)',
      },
    },
  },
  plugins: [],
};
