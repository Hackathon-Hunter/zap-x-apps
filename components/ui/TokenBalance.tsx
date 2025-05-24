import React from 'react';

import { View, StyleSheet } from 'react-native';

import Svg, { Defs, LinearGradient, Rect, Stop } from 'react-native-svg';

import { Colors } from '@/constants/Colors';

import { ThemedText } from '../ThemedText';

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

function GradientSeparator() {
  return (
    <Svg height={3} width="100%">
      <Defs>
        <LinearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <Stop offset="0%" stopColor="#0A0D12" />
          <Stop offset="50%" stopColor="#414651" />
          <Stop offset="100%" stopColor="#0A0D12" />
        </LinearGradient>
      </Defs>
      <Rect width="100%" height={2} fill="url(#grad)" rx={50} ry={50} />
    </Svg>
  );
}

const TokenBalance = ({
  token = 'BOME',
  amount = '2,000',
  network = 'Ethereum',
}) => {
  return (
    <View
      className="w-full"
      style={{ position: 'relative', ...styles.cardShadow }}
    >
      <GradientBorderBox />
      <View className="bg-black py-4 justify-center items-center mx-[0.5px] my-[0.5px]">
        <ThemedText
          color={Colors.dark.text.primary}
          numbersOnly
          className="text-base font-medium"
        >
          {token}
        </ThemedText>
        <ThemedText
          color={Colors.dark.text.primary}
          numbersOnly
          className="text-4xl font-medium mt-1"
          style={{ textShadowColor: 'white', textShadowRadius: 10 }}
        >
          {amount}
        </ThemedText>
        <View className="flex flex-row justify-center items-center gap-4 p-4">
          <ThemedText
            color={Colors.dark.text.secondary}
            numbersOnly
            className="text-base font-medium"
          >
            NETWORK
          </ThemedText>
          <View className="flex-1">
            <GradientSeparator />
          </View>
          <ThemedText
            color={Colors.dark.text.secondary}
            numbersOnly
            className="text-base font-medium"
          >
            {network}
          </ThemedText>
        </View>
      </View>
    </View>
  );
};

export default TokenBalance;

const styles = StyleSheet.create({
  cardShadow: {
    elevation: 10,
    backgroundColor: '#000',

    // Optional iOS shadow for parity:
    shadowColor: '#fff',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
});
