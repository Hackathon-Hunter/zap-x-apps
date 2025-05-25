import React from 'react';

import { View } from 'react-native';

import Svg, { Defs, RadialGradient, Stop, Rect } from 'react-native-svg';

import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';

type HeaderCardDetailHistoryProps = {
  amount: string;
  currency: string;
  date: string;
  amountColor?: string;
  currencyColor?: string;
  gradientColors?: string[];
};

export default function HeaderCardDetailHistory({
  amount,
  currency,
  date,
  amountColor = Colors.dark.accent.green,
  currencyColor = Colors.dark.text.muted,
  gradientColors = ['#fff', '#fff'],
}: HeaderCardDetailHistoryProps) {
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
            r="50%"
            gradientUnits="userSpaceOnUse"
          >
            <Stop offset="0%" stopColor={gradientColors[0]} stopOpacity={0.2} />
            <Stop
              offset="30%"
              stopColor={gradientColors[0]}
              stopOpacity={0.15}
            />
            <Stop
              offset="50%"
              stopColor={gradientColors[0]}
              stopOpacity={0.12}
            />
            <Stop
              offset="80%"
              stopColor={gradientColors[0]}
              stopOpacity={0.06}
            />
            <Stop
              offset="85%"
              stopColor={gradientColors[0]}
              stopOpacity={0.02}
            />
            <Stop
              offset="90%"
              stopColor={gradientColors[0]}
              stopOpacity={0.01}
            />
            <Stop
              offset="95%"
              stopColor={gradientColors[0]}
              stopOpacity={0.005}
            />
            <Stop offset="100%" stopColor={gradientColors[1]} stopOpacity={0} />
          </RadialGradient>
        </Defs>
      </Svg>
    );
  }

  return (
    <View className="bg-black border border-gray-700 py-2 justify-center items-center mx-[0.5px] my-[0.5px] relative overflow-hidden">
      <View className="absolute inset-0" />
      <GradientBackground />
      <View className="flex flex-row gap-2 items-end relative z-10">
        <ThemedText
          color={currencyColor}
          numbersOnly
          className="text-sm font-medium"
          style={{ marginBottom: 6 }}
        >
          {currency}
        </ThemedText>
        <ThemedText
          color={amountColor}
          numbersOnly
          className="text-4xl font-medium"
          style={{
            textShadowColor: Colors.dark.text.accent,
            textShadowRadius: 10,
          }}
        >
          {amount}
        </ThemedText>
      </View>
      <View className="flex flex-row justify-center items-center gap-4 p-4 relative z-10">
        <ThemedText
          color={Colors.dark.text.muted}
          numbersOnly
          className="text-sm font-medium"
        >
          {date}
        </ThemedText>
      </View>
    </View>
  );
}
