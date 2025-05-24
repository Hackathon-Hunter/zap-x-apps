import React from 'react';
import { TouchableOpacity, StyleSheet, Text, ViewStyle, GestureResponderEvent } from 'react-native';

type ThemeCircleButtonProps = {
  size?: number;
  onPress: (event: GestureResponderEvent) => void;
  backgroundColor?: string;
  borderColor?: string;
  borderWidth?: number;
  disabled?: boolean;
  children: React.ReactNode; 
  style?: ViewStyle;
  activeOpacity?: number;
};

const ThemeCircleButton: React.FC<ThemeCircleButtonProps> = ({
  size = 48,
  onPress,
  backgroundColor = '#4CAF50',
  borderColor = 'transparent',
  borderWidth = 0,
  disabled = false,
  children,
  style,
  activeOpacity = 0.7,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      activeOpacity={activeOpacity}
      style={[
        styles.button,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor,
          borderColor,
          borderWidth,
          opacity: disabled ? 0.5 : 1,
        },
        style,
      ]}
    >
      {children}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ThemeCircleButton;
