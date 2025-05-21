import { StyleSheet, TextStyle } from 'react-native';

/**
 * Font styles to be used across the application
 */
export const fontStyles = StyleSheet.create({
  base: {
    fontFamily: 'Geist-Regular',
    fontSize: 16,
    lineHeight: 24,
  },
  medium: {
    fontFamily: 'Geist-Medium',
    fontSize: 16,
    lineHeight: 24,
  },

  h1: {
    fontFamily: 'Geist-Medium',
    fontSize: 32,
    lineHeight: 38,
  },
  h2: {
    fontFamily: 'Geist-Medium',
    fontSize: 24,
    lineHeight: 32,
  },
  h3: {
    fontFamily: 'Geist-Medium',
    fontSize: 20,
    lineHeight: 28,
  },

  mono: {
    fontFamily: 'GeistMono-Regular',
    fontSize: 16,
    lineHeight: 24,
  },
  monoMedium: {
    fontFamily: 'GeistMono-Medium',
    fontSize: 16,
    lineHeight: 24,
  },

  price: {
    fontFamily: 'GeistMono-Medium',
    fontSize: 20,
    lineHeight: 28,
  },
  smallNumber: {
    fontFamily: 'GeistMono-Regular',
    fontSize: 14,
    lineHeight: 20,
  },
});

/**
 * Utility function to determine if a string consists only of numbers
 * @param text The text to check
 * @returns Boolean indicating if the text contains only numbers
 */
export function isNumberOnly(text: string): boolean {
  return /^\d+([.,]\d+)?$/.test(text);
}

/**
 * Get the appropriate text style based on the content
 * @param text The text content
 * @param baseStyle The base style to apply
 * @param numberStyle The style to apply if the text is a number
 * @returns The appropriate TextStyle
 */
export function getTextStyle(
  text: string,
  baseStyle: TextStyle,
  numberStyle: TextStyle
): TextStyle {
  return isNumberOnly(text) ? numberStyle : baseStyle;
}
