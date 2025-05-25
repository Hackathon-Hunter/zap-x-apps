import React, { useState } from 'react';

import { View, StyleSheet, Pressable, ScrollView } from 'react-native';

import Svg, { Defs, LinearGradient, Rect, Stop } from 'react-native-svg';

import { Colors } from '@/constants/Colors';

import ArrowDownIcon from '../icons/ArrowDownIcon';
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

const TokenBalanceMerchant = ({
  token = 'BOME',
  amount = '2,000',
  onTokenChange, // Optional callback to parent component
}: {
  token?: string;
  amount?: string;
  onTokenChange?: (newToken: string) => void;
}) => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [selectedToken, setSelectedToken] = useState(token); // Use token as initial value

  const options = ['USD', 'IDR']; // Added more options including the original token

  const handleToggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const handleSelectOption = (option: string) => {
    setSelectedToken(option); // Update the selected token
    setIsDropdownVisible(false); // Close dropdown after selection

    // Call the optional callback to notify parent component
    if (onTokenChange) {
      onTokenChange(option);
    }
  };

  return (
    <View
      className="w-full"
      style={{ position: 'relative', ...styles.cardShadow }}
    >
      <GradientBorderBox />
      <View className="bg-black py-4 justify-center items-center mx-[0.5px] my-[0.5px]">
        <Pressable
          className="flex-row items-center"
          onPress={handleToggleDropdown}
        >
          <ThemedText
            color={Colors.dark.text.secondary}
            numbersOnly
            className="text-base font-medium mr-2"
          >
            {selectedToken} Balance
          </ThemedText>
          <ArrowDownIcon />
        </Pressable>
        <View className="flex flex-row items-end gap-2">
          <ThemedText
            color={Colors.dark.text.secondary}
            numbersOnly
            className="text-base font-medium"
          >
            {selectedToken}
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
          onPress={() => {}}
          text="Generate QR"
          LeftIcon={QRIcon}
        />
        <ThemeButton
          variant="primary"
          onPress={() => {}}
          text="Withdraw"
          LeftIcon={WithdawIcon}
        />
      </View>

      {/* Dropdown - only show when isDropdownVisible is true */}
      {isDropdownVisible && (
        <View className="absolute top-12 left-1/4 right-1/4 bg-black border border-gray-700 rounded-md z-10 max-h-40">
          <ScrollView nestedScrollEnabled={true}>
            {options.map((option) => (
              <Pressable
                key={option}
                onPress={() => handleSelectOption(option)}
                className="p-3 border-b border-gray-800 last:border-b-0 items-center"
              >
                <ThemedText
                  color={
                    selectedToken === option
                      ? Colors.dark.text.primary
                      : Colors.dark.text.secondary
                  }
                  className="text-sm text-center"
                >
                  {option}
                </ThemedText>
              </Pressable>
            ))}
          </ScrollView>
        </View>
      )}
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
