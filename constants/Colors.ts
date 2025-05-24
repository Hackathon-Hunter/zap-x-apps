/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * Based on ZapX wallet design with crypto-focused dark theme.
 * This file is shared between React Native components and Tailwind CSS configuration.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#0a7ea4';
const tintColorDark = '#00ff88'; // ZapX signature green

export const ColorPalette = {
  // Base colors
  black: '#0a0a0a',
  white: '#ffffff',

  // Grays
  gray: {
    50: '#f8f9fa',
    100: '#e9ecef',
    200: '#dee2e6',
    300: '#ced4da',
    400: '#a0a0a0',
    500: '#6b6b6b',
    600: '#495057',
    700: '#414651',
    800: '#333333',
    900: '#181D27',
    950: '#1a1a1a',
  },

  // Accent colors
  green: {
    DEFAULT: '#00ff88',
    50: '#f0fdf8',
    100: '#dcfce7',
    200: '#bbf7d0',
    300: '#86efac',
    400: '#4ade80',
    500: '#22c55e',
    600: '#16a34a',
    700: '#15803d',
    800: '#166534',
    900: '#14532d',
    950: '#052e16',
    accent: '#00ff88',
  },

  // Status colors
  blue: '#3b82f6',
  yellow: '#fbbf24',
  red: '#ef4444',
};

// React Native Colors (maintains existing structure for compatibility)
export const Colors = {
  light: {
    text: '#11181C',
    background: ColorPalette.white,
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,

    // Additional colors for ZapX theme (light mode fallbacks)
    surface: ColorPalette.gray[50],
    border: ColorPalette.gray[100],
    muted: ColorPalette.gray[500],
    success: ColorPalette.green[600],
    warning: ColorPalette.yellow,
    error: ColorPalette.red,
  },
  dark: {
    background: ColorPalette.black,
    tint: tintColorDark,
    icon: ColorPalette.gray[400],
    tabIconDefault: ColorPalette.gray[500],
    tabIconSelected: tintColorDark,

    // ZapX-specific dark theme colors
    surface: {
      primary: ColorPalette.gray[950], // Card/container background
      secondary: ColorPalette.gray[900], // Elevated surfaces
      tertiary: ColorPalette.gray[800], // Highly elevated surfaces
    },

    text: {
      primary: ColorPalette.white, // Main white text
      secondary: ColorPalette.gray[400], // Secondary gray text
      muted: ColorPalette.gray[500], // Muted/disabled text
      accent: '#c0c0c0', // Slightly emphasized text
    },

    accent: {
      green: ColorPalette.green.accent, // Primary green accent
      greenSecondary: ColorPalette.green[500], // Alternative green
      blue: ColorPalette.blue, // Blue accents
    },

    border: {
      primary: ColorPalette.gray[800], // Main border color
      secondary: ColorPalette.gray[700], // Lighter borders
      accent: ColorPalette.green.accent, // Accent borders
    },

    status: {
      success: ColorPalette.green.accent, // Success/positive transactions
      warning: ColorPalette.yellow, // Warning states
      error: ColorPalette.red, // Error/negative
      info: ColorPalette.blue, // Information
    },

    interactive: {
      hover: ColorPalette.gray[800], // Hover states
      active: ColorPalette.gray[700], // Active/pressed states
      focus: ColorPalette.green.accent, // Focus ring color
      disabled: ColorPalette.gray[950], // Disabled elements
    },

    // Component-specific colors
    components: {
      qrButton: ColorPalette.gray[950],
      transactionItem: ColorPalette.gray[950],
      balance: ColorPalette.white,
      transactionPositive: ColorPalette.green.accent,
      transactionHash: ColorPalette.gray[400],
      currency: ColorPalette.gray[400],
      tabBar: ColorPalette.black,
    },
  },
};

// Tailwind-compatible color export
export const TailwindColors = {
  // Base colors
  background: {
    primary: ColorPalette.black,
    secondary: ColorPalette.gray[950],
    tertiary: ColorPalette.gray[900],
  },

  text: {
    primary: ColorPalette.white,
    secondary: ColorPalette.gray[400],
    muted: ColorPalette.gray[500],
    accent: '#c0c0c0',
  },

  accent: {
    green: ColorPalette.green.accent,
    'green-secondary': ColorPalette.green[500],
    blue: ColorPalette.blue,
  },

  border: {
    primary: ColorPalette.gray[800],
    secondary: ColorPalette.gray[700],
    accent: ColorPalette.green.accent,
  },

  surface: {
    primary: ColorPalette.gray[950],
    secondary: ColorPalette.gray[900],
    tertiary: ColorPalette.gray[800],
  },

  status: {
    success: ColorPalette.green.accent,
    warning: ColorPalette.yellow,
    error: ColorPalette.red,
    info: ColorPalette.blue,
  },

  interactive: {
    hover: ColorPalette.gray[800],
    active: ColorPalette.gray[700],
    focus: ColorPalette.green.accent,
    disabled: ColorPalette.gray[950],
  },

  // Component-specific colors
  components: {
    'qr-button': ColorPalette.gray[950],
    'transaction-item': ColorPalette.gray[950],
    balance: ColorPalette.white,
    'transaction-positive': ColorPalette.green.accent,
    'transaction-hash': ColorPalette.gray[400],
    currency: ColorPalette.gray[400],
  },
};

export type ColorScheme = 'light' | 'dark';
export type ThemeColors = typeof Colors.light | typeof Colors.dark;
