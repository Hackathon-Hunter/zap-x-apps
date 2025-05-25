import React from 'react';

import { View, StyleSheet } from 'react-native';

import Svg, { Defs, LinearGradient, Rect, Stop } from 'react-native-svg';

import { Colors } from '@/constants/Colors';

import QRIcon from '../icons/QRIcon';
import WithdawIcon from '../icons/WithdrawIcon';
import ThemeButton from '../ThemedButton';
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

const TokenBalanceMerchant = ({ token = 'BOME', amount = '2,000' }) => {
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
        <View className="flex flex-row items-end gap-2">
          <ThemedText
            color={Colors.dark.text.secondary}
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
        </View>
      </View>
      <View className="flex flex-row justify-around">
        <ThemeButton
          variant="primary"
          onPress={() => { }}
          text="Generate QR"
          LeftIcon={QRIcon}
        />
        <ThemeButton
          variant="primary"
          onPress={() => { }}
          text="Withdraw"
          LeftIcon={WithdawIcon}
        />
      </View>
    </View>
  );
};

export default TokenBalanceMerchant;

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
