import React from 'react';

import { View, TouchableOpacity } from 'react-native';

import { useRouter } from 'expo-router';

import { ColorPalette, Colors } from '@/constants/Colors';
import { USER_ROLE } from '@/constants/User';

import { ThemedText } from '../ThemedText';

type TransactionItemCardProps = {
  type?: 'SEND' | 'RECEIVE' | 'SWAP' | string;
  date?: string;
  pair?: string;
  amount?: string;
  amountColor?: string;
  role?: string;
};

const TransactionItemCard = ({
  type = 'SEND',
  date = 'MAY 16, 2025 - 10:50 PM',
  pair = 'BOME → USD',
  amount = 'USDT 50',
  amountColor = ColorPalette.green.DEFAULT,
  role,
}: TransactionItemCardProps) => {
  const router = useRouter();

  const handlePress = () => {
    const path =
      role === USER_ROLE.MERCHANT
        ? '/(merchant)/transactionDetails'
        : '/(user)/transactionDetail';

    router.push(path);
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <View className="border-gray-700 border-[1px] bg-gray-900 p-3 gap-3 rounded-md">
        <View className="flex flex-row justify-between">
          {role === USER_ROLE.MERCHANT ? (
            <ThemedText
              color={Colors.dark.text.primary}
              numbersOnly
              className="text-xs"
            >
              {type}
            </ThemedText>
          ) : (
            <ThemedText
              color={Colors.dark.text.secondary}
              numbersOnly
              className="text-xs"
            >
              {type}
            </ThemedText>
          )}
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
            color={Colors.dark.text.secondary}
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
    </TouchableOpacity>
  );
};

export default TransactionItemCard;
