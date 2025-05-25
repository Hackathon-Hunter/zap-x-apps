import React, { ElementType } from 'react';

import { View } from 'react-native';

import ArrowRightIcon from '@/components/icons/ArrowRightIcon';
import { ColorPalette, Colors } from '@/constants/Colors';

import { ThemedText } from '../ThemedText';

type SettingCardProfileProps = {
  type?: 'SEND' | 'RECEIVE' | 'SWAP' | string;
  date?: string;
  LeftIcon?: ElementType;
};

const SettingCardProfile = ({
  type = 'SEND',
  date = 'MAY 16, 2025 - 10:50 PM',
  LeftIcon,
}: SettingCardProfileProps) => {
  return (
    <View className="flex flex-row justify-between items-center border-gray-700 border-[1px] bg-gray-900 p-3 gap-3 rounded-md">
      <View className="flex flex-row items-center gap-3">
        {LeftIcon && (
          <LeftIcon color={Colors.dark.text.primary} height={24} width={24} />
        )}
        <View className="flex">
          <ThemedText
            color={Colors.dark.text.primary}
            numbersOnly
            className="text-lg"
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
      </View>

      <ArrowRightIcon />
    </View>
  );
};

export default SettingCardProfile;
