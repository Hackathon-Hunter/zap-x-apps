import React, { View, TouchableOpacity, ScrollView } from 'react-native';

import CopyIcon from '@/components/icons/CopyIcon';
import DownloadIcon from '@/components/icons/DownloadIcon';
import GradientSeparator from '@/components/icons/GradientSeparator';
import ShareIcon from '@/components/icons/ShareIcon';
import ThemeButton from '@/components/ThemedButton';
import { ThemedText } from '@/components/ThemedText';
import HeaderCardDetailHistory from '@/components/ui/HeaderCardDetailHistory';
import { Colors } from '@/constants/Colors';

export default function TransactionDetail() {
  return (
    <ScrollView>
      <View className="flex flex-col gap-4 px-4">
        <HeaderCardDetailHistory
          amount="101,000"
          currency="IDR"
          date="MAY 16, 2025 - 10:50 PM"
        />

        <View className="flex flex-col gap-3 px-4 py-4 border border-gray-700">
          <View className="flex flex-col gap-2">
            <ThemedText
              color={Colors.dark.text.muted}
              className="text-sm font-medium"
            >
              Status
            </ThemedText>
            <ThemedText
              color={Colors.dark.accent.green}
              className="text-md font-medium"
            >
              Success
            </ThemedText>
          </View>
          <View className="flex flex-col gap-2">
            <ThemedText
              color={Colors.dark.text.muted}
              className="text-sm font-medium"
            >
              Merchant
            </ThemedText>
            <ThemedText
              color={Colors.dark.text.primary}
              className="text-md font-medium"
            >
              IDRX Money Changer
            </ThemedText>
          </View>
          <View className="flex flex-col gap-2">
            <ThemedText
              color={Colors.dark.text.muted}
              className="text-sm font-medium"
            >
              Amount
            </ThemedText>
            <View className="flex flex-row gap-2">
              <ThemedText
                color={Colors.dark.text.muted}
                className="text-md font-medium"
              >
                IDR
              </ThemedText>
              <ThemedText
                color={Colors.dark.text.primary}
                className="text-md font-medium"
                numbersOnly
              >
                100,000 +
              </ThemedText>
              <ThemedText
                color={Colors.dark.text.muted}
                className="text-md font-medium"
              >
                Admin Fee IDR
              </ThemedText>
              <ThemedText
                color={Colors.dark.text.primary}
                className="text-md font-medium"
                numbersOnly
              >
                1,000
              </ThemedText>
            </View>
          </View>
          <View className="flex flex-col gap-2">
            <ThemedText
              color={Colors.dark.text.muted}
              className="text-sm font-medium"
            >
              Total
            </ThemedText>
            <View className="flex flex-row gap-2">
              <ThemedText
                color={Colors.dark.text.muted}
                className="text-md font-medium"
              >
                IDR
              </ThemedText>
              <ThemedText
                color={Colors.dark.text.primary}
                className="text-md font-medium"
                numbersOnly
              >
                101,000
              </ThemedText>
            </View>
          </View>
          <View className="flex flex-col gap-2">
            <ThemedText
              color={Colors.dark.text.muted}
              className="text-sm font-medium"
            >
              From
            </ThemedText>
            <View className="flex flex-row gap-1 pr-2">
              <ThemedText
                color={Colors.dark.text.primary}
                className="text-md font-medium text-wrap"
              >
                0x37548Fd40aB0e4DE5804bD631EcT38772cB7984
              </ThemedText>
              <TouchableOpacity>
                <CopyIcon />
              </TouchableOpacity>
            </View>
          </View>
          <View className="flex flex-col gap-2">
            <ThemedText
              color={Colors.dark.text.muted}
              className="text-sm font-medium"
            >
              To
            </ThemedText>
            <View className="flex flex-row gap-1 pr-2">
              <ThemedText
                color={Colors.dark.text.primary}
                className="text-md font-medium text-wrap"
              >
                0x35EfDE0E81608AC266373fC8A389dF622AF7a
              </ThemedText>
              <TouchableOpacity>
                <CopyIcon />
              </TouchableOpacity>
            </View>
          </View>
          <View className="flex flex-col gap-2">
            <ThemedText
              color={Colors.dark.text.muted}
              className="text-sm font-medium"
            >
              Block
            </ThemedText>
            <ThemedText
              color={Colors.dark.text.primary}
              className="text-md font-medium"
            >
              0
            </ThemedText>
          </View>
          <View className="flex flex-col gap-2">
            <ThemedText
              color={Colors.dark.text.muted}
              className="text-sm font-medium"
            >
              Gas Used
            </ThemedText>
            <ThemedText
              color={Colors.dark.text.primary}
              className="text-md font-medium"
            >
              0
            </ThemedText>
          </View>
          <View className="flex flex-col gap-2">
            <ThemedText
              color={Colors.dark.text.muted}
              className="text-sm font-medium"
            >
              Transaction Hash
            </ThemedText>
            <ThemedText
              color={Colors.dark.text.primary}
              className="text-md font-medium"
            >
              0xc10678e9…a8296dc9
            </ThemedText>
          </View>
        </View>

        <View className="flex flex-col gap-3 px-4 py-4 border border-gray-700">
          <View className="flex flex-row justify-between items-center">
            <ThemedText
              color={Colors.dark.text.muted}
              className="text-md font-medium"
            >
              Network
            </ThemedText>
            <ThemedText
              color={Colors.dark.text.primary}
              className="text-md font-medium"
            >
              Ethereum
            </ThemedText>
          </View>
          <View className="flex flex-row justify-between items-center">
            <ThemedText
              color={Colors.dark.text.muted}
              className="text-md font-medium"
            >
              Coin
            </ThemedText>
            <ThemedText
              color={Colors.dark.text.primary}
              className="text-md font-medium"
            >
              BOME
            </ThemedText>
          </View>
          <View className="flex flex-row justify-between items-center">
            <ThemedText
              color={Colors.dark.text.muted}
              className="text-md font-medium"
            >
              Swapped Coin
            </ThemedText>
            <ThemedText
              color={Colors.dark.text.primary}
              className="text-md font-medium"
              numbersOnly
            >
              1,760.08
            </ThemedText>
          </View>
          <GradientSeparator />
          <View className="flex flex-row justify-between w-full">
            <ThemedText
              color={Colors.dark.text.muted}
              className="text-md font-medium"
            >
              Coin Balance
            </ThemedText>
            <View
              className="flex flex-col items-end justify-end"
              style={{ alignItems: 'flex-end' }}
            >
              <ThemedText
                color={Colors.dark.text.primary}
                className="text-md font-medium"
                style={{ textAlign: 'right' }}
                numbersOnly
              >
                3,240
              </ThemedText>
              <ThemedText
                color={Colors.dark.text.muted}
                className="text-sm font-medium"
                style={{ textAlign: 'right' }}
                numbersOnly
              >
                From 5,000
              </ThemedText>
            </View>
          </View>
        </View>

        <View>
          <ThemeButton
            variant="primary"
            onPress={() => {}}
            text="Share as Receipt"
            LeftIcon={ShareIcon}
          />
          <View className="flex flex-row items-center gap-2 mt-4">
            <View className="flex-1">
              <GradientSeparator />
            </View>
            <ThemedText
              color={Colors.dark.text.muted}
              className="text-md font-medium"
              style={{ paddingHorizontal: 8 }}
            >
              OR
            </ThemedText>
            <View className="flex-1">
              <GradientSeparator />
            </View>
          </View>
          <ThemeButton
            variant="secondary"
            onPress={() => {}}
            text="Download Receipt"
            LeftIcon={DownloadIcon}
          />
        </View>
      </View>
    </ScrollView>
  );
}
