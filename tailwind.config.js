// tailwind.config.js
module.exports = {
  content: ['./App.tsx', './components/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Geist-Regular'],
        medium: ['Geist-Medium'],
        mono: ['GeistMono-Regular'],
        'mono-medium': ['GeistMono-Medium'],
      },
    },
  },
  plugins: [],
};
