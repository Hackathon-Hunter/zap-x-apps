import React, { View, TouchableOpacity, ScrollView } from 'react-native';

import DownloadIcon from '@/components/icons/DownloadIcon';
import CopyIcon from '@/components/icons/CopyIcon';
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
          headReceived={true}
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
          <View className="flex flex-col gap-2">
            <ThemedText
              color={Colors.dark.text.muted}
              className="text-sm font-medium"
            >
              To
            </ThemedText>
            <ThemedText
              color={Colors.dark.text.primary}
              className="text-md font-medium"
            >
              IDRX Money Changer
            </ThemedText>
          </View>
        </View>

        <View>
          <ThemeButton
            variant="primary"
            onPress={() => { }}
            text="Share"
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
            onPress={() => { }}
            text="Download"
            LeftIcon={DownloadIcon}
          />
        </View>
      </View>
    </ScrollView>
  );
}
