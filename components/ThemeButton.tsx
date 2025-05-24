import React, { useCallback } from 'react';

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
  const accentColor = ColorPalette.green.accent;
  const primaryText = ColorPalette.white;
  const getVariantColors = useCallback(
    (variant: ButtonVariant) => {
      switch (variant) {
      case 'primary':
        return {
          bg: accentColor,
          text: ColorPalette.black,
            border: accentColor,
        };
      case 'secondary':
        return {
          bg: ColorPalette.yellow,
          text: ColorPalette.black,
          border: ColorPalette.yellow,
          };
      case 'success':
        return {
          bg: ColorPalette.green[600],
            text: ColorPalette.white,
          border: ColorPalette.green[600],
        };
      case 'warning':
        return {
          bg: ColorPalette.yellow,
            text: ColorPalette.black,
          border: ColorPalette.yellow,
        };
      case 'error':
          return {
          bg: ColorPalette.red,
          text: ColorPalette.white,
          border: ColorPalette.red,
        };
      case 'accent':
        return {
            bg: ColorPalette.gray[800],
          text: primaryText,
          border: ColorPalette.gray[700],
        };
      default:
          return {
          bg: accentColor,
          text: ColorPalette.black,
          border: accentColor,
          };
      }
    },
    [accentColor, primaryText]
  );

  const variantColors = getVariantColors(variant);
  const finalBackgroundColor = backgroundColor || variantColors.bg;
  const finalTextColor = textColor || variantColors.text;
  const finalBorderColor = borderColor || variantColors.border;

  const buttonStyle = [
    styles.button,
    {
      backgroundColor: outline ? 'transparent' : finalBackgroundColor,
      borderColor: outline ? finalBorderColor : 'transparent',
      borderWidth: outline ? 2 : 0,
      width: width,
      opacity: disabled ? 0.6 : 1,
    },
  ];

  const textStyle = [
    styles.text,
    {
      color: finalTextColor,
      fontSize: fontSize,
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
