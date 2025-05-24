import React from 'react';

import {
  TouchableOpacity,
  Text,
  StyleSheet,
  DimensionValue,
} from 'react-native';

import { ColorPalette } from '@/constants/Colors';

type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'error'
  | 'accent';

type ButtonProps = {
  text: string;
  onPress: () => void;
  variant?: ButtonVariant;
  outline?: boolean;
  disabled?: boolean;
  fontSize?: number;
  width?: DimensionValue;
  backgroundColor?: string;
  textColor?: string;
  borderColor?: string;
};

const VARIANT_COLORS = {
  primary: {
    bg: ColorPalette.green.accent,
    text: ColorPalette.black,
    border: ColorPalette.green.accent,
  },
  secondary: {
    bg: ColorPalette.yellow,
    text: ColorPalette.black,
    border: ColorPalette.yellow,
  },
  success: {
    bg: ColorPalette.green[600],
    text: ColorPalette.white,
    border: ColorPalette.green[600],
  },
  warning: {
    bg: ColorPalette.yellow,
    text: ColorPalette.black,
    border: ColorPalette.yellow,
  },
  error: {
    bg: ColorPalette.red,
    text: ColorPalette.white,
    border: ColorPalette.red,
  },
  accent: {
    bg: ColorPalette.gray[800],
    text: ColorPalette.white,
    border: ColorPalette.gray[700],
  },
} as const;

const ThemeButton: React.FC<ButtonProps> = ({
  text,
  onPress,
  variant = 'primary',
  outline = false,
  disabled = false,
  fontSize = 16,
  width = '100%',
  backgroundColor,
  textColor,
  borderColor,
}) => {
  const variantColors = VARIANT_COLORS[variant];

  const buttonStyle = [
    styles.button,
    {
      backgroundColor: outline
        ? 'transparent'
        : backgroundColor || variantColors.bg,
      borderColor: outline
        ? borderColor || variantColors.border
        : 'transparent',
      borderWidth: outline ? 2 : 0,
      width,
      opacity: disabled ? 0.6 : 1,
    },
  ];

  const textStyle = [
    styles.text,
    {
      color: textColor || variantColors.text,
      fontSize,
    },
  ];

  return (
    <TouchableOpacity
      onPress={onPress}
      style={buttonStyle}
      disabled={disabled}
      activeOpacity={0.8}
    >
      <Text style={textStyle}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 56,
  },
  text: {
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default ThemeButton;
