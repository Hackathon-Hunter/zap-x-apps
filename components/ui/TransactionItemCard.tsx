import React from 'react';

import { View } from 'react-native';

import { ColorPalette, Colors } from '@/constants/Colors';

import { ThemedText } from '../ThemedText';

type TransactionItemCardProps = {
  type?: 'SEND' | 'RECEIVE' | 'SWAP' | string;
  date?: string;
  pair?: string;
  amount?: string;
  amountColor?: string;
};

const TransactionItemCard = ({
  type = 'SEND',
  date = 'MAY 16, 2025 - 10:50 PM',
  pair = 'BOME → USD',
  amount = 'USDT 50',
  amountColor = ColorPalette.green.DEFAULT,
}: TransactionItemCardProps) => {
  return (
    <View className="border-gray-700 border-[1px] bg-gray-900 p-3 gap-3 rounded-md">
      <View className="flex flex-row justify-between">
        <ThemedText
          color={Colors.dark.text.secondary}
          numbersOnly
          className="text-xs"
        >
          {type}
        </ThemedText>
        <ThemedText
          color={Colors.dark.text.secondary}
          numbersOnly
          className="text-xs"
        >
          {date}
        </ThemedText>
      </View>

      <View className="flex flex-row justify-between">
        <ThemedText
          color={Colors.dark.text.primary}
          numbersOnly
          className="text-xs"
        >
          {pair}
        </ThemedText>

        <ThemedText color={amountColor} numbersOnly className="text-sm">
          {amount}
        </ThemedText>
      </View>
    </View>
  );
};

export default TransactionItemCard;
