import React, { ElementType } from 'react';

import { TouchableOpacity, StyleSheet, View } from 'react-native';

import Svg, {
  Defs,
  LinearGradient,
  RadialGradient,
  Rect,
  Stop,
} from 'react-native-svg';

import { Colors } from '@/constants/Colors';

import { ThemedText } from './ThemedText';

type ButtonVariant = 'primary' | 'secondary';

type ButtonProps = {
  text: string;
  onPress: () => void;
  variant?: ButtonVariant;
  disabled?: boolean;
  LeftIcon?: ElementType;
  RightIcon?: ElementType;
};

const ThemeButton: React.FC<ButtonProps> = ({
  text,
  onPress,
  variant = 'primary',
  disabled = false,
  LeftIcon,
  RightIcon,
}) => {
  function GradientBackground() {
    return (
      <Svg
        height="100%"
        width="100%"
        fill="none"
        style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
      >
        <Rect width="100%" height="100%" fill="url(#grad)" />
        <Defs>
          <RadialGradient
            id="grad"
            cx="50%"
            cy="0"
            r="100%"
            gradientUnits="userSpaceOnUse"
          >
            <Stop offset="0%" stopColor="#fff" stopOpacity={0.2} />
            <Stop offset="30%" stopColor="#fff" stopOpacity={0.15} />
            <Stop offset="50%" stopColor="#fff" stopOpacity={0.12} />
            <Stop offset="70%" stopColor="#fff" stopOpacity={0.06} />
            <Stop offset="85%" stopColor="#fff" stopOpacity={0.02} />
            <Stop offset="85%" stopColor="#fff" stopOpacity={0.02} />
            <Stop offset="90%" stopColor="#fff" stopOpacity={0.01} />
            <Stop offset="95%" stopColor="#fff" stopOpacity={0.005} />
            <Stop offset="100%" stopColor="#fff" stopOpacity={0} />
          </RadialGradient>
        </Defs>
      </Svg>
    );
  }

  function GradientBorderBox() {
    return (
      <Svg style={StyleSheet.absoluteFill} preserveAspectRatio="none">
        <Defs>
          <LinearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <Stop offset="0%" stopColor="#414651" />
            <Stop offset="50%" stopColor="#FFFFFF" />
            <Stop offset="100%" stopColor="#414651" />
          </LinearGradient>
        </Defs>
        <Rect width="100%" height="100%" fill="url(#grad)" />
      </Svg>
    );
  }

  function renderPrimary() {
    return (
      <View className="w-full relative">
        <GradientBorderBox />
        <View className="bg-black py-4 justify-center items-center mx-[0.5px] my-[0.5px]">
          <GradientBackground />
          <View className="flex gap-3 flex-row h-6 items-center">
            {LeftIcon && (
              <LeftIcon
                color={Colors.dark.text.primary}
                height={24}
                width={24}
              />
            )}
            <ThemedText
              color={Colors.dark.text.primary}
              className="text-base font-medium"
            >
              {text}
            </ThemedText>
            {RightIcon && (
              <RightIcon
                color={Colors.dark.text.primary}
                height={24}
                width={24}
              />
            )}
          </View>
        </View>
      </View>
    );
  }

  function renderSecondary() {
    return (
      <View className="w-full py-4 justify-center items-center mx-[0.5px] my-[0.5px]">
        <ThemedText
          color={Colors.dark.text.primary}
          className="text-base font-medium"
        >
          <View className="flex gap-3 flex-row h-6 items-center">
            {LeftIcon && (
              <LeftIcon
                color={Colors.dark.text.primary}
                height={24}
                width={24}
              />
            )}
            <ThemedText
              color={Colors.dark.text.primary}
              className="text-base font-medium"
            >
              {text}
            </ThemedText>
          </View>
        </ThemedText>
      </View>
    );
  }
  return (
    <TouchableOpacity onPress={onPress} disabled={disabled} className="flex-1">
      {variant === 'primary' ? renderPrimary() : renderSecondary()}
    </TouchableOpacity>
  );
};

export default ThemeButton;
