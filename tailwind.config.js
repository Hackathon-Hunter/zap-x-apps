const { TailwindColors, ColorPalette } = require('./constants/Colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        // Import the shared color palette
        ...ColorPalette,

        // Import structured Tailwind colors
        ...TailwindColors,

        // Flatten component colors for easier access
        'qr-button': TailwindColors.components['qr-button'],
        'transaction-item': TailwindColors.components['transaction-item'],
        'transaction-positive':
          TailwindColors.components['transaction-positive'],
        'transaction-hash': TailwindColors.components['transaction-hash'],
      },

      // Text color utilities
      textColor: {
        balance: TailwindColors.components.balance,
        'transaction-positive':
          TailwindColors.components['transaction-positive'],
        'transaction-hash': TailwindColors.components['transaction-hash'],
        currency: TailwindColors.components.currency,
      },

      // Background color utilities
      backgroundColor: {
        'qr-button': TailwindColors.components['qr-button'],
        'transaction-item': TailwindColors.components['transaction-item'],
      },

      // Border color utilities
      borderColor: {
        accent: TailwindColors.border.accent,
        primary: TailwindColors.border.primary,
        secondary: TailwindColors.border.secondary,
      },

      // Box shadows for dark theme
      boxShadow: {
        'dark-sm': '0 1px 2px 0 rgba(0, 0, 0, 0.3)',
        'dark-md':
          '0 4px 6px -1px rgba(0, 0, 0, 0.4), 0 2px 4px -1px rgba(0, 0, 0, 0.3)',
        'dark-lg':
          '0 10px 15px -3px rgba(0, 0, 0, 0.4), 0 4px 6px -2px rgba(0, 0, 0, 0.3)',
        'green-glow': `0 0 20px ${ColorPalette.green.accent}40`,
      },

      // Ring colors for focus states
      ringColor: {
        accent: TailwindColors.accent.green,
      },

      // Gradient colors
      gradientColorStops: {
        'accent-green': TailwindColors.accent.green,
        'surface-primary': TailwindColors.surface.primary,
        'background-primary': TailwindColors.background.primary,
      },
    },
  },
  plugins: [],
};
