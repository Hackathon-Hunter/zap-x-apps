import React, { useEffect } from 'react';

import { View, Pressable, ScrollView } from 'react-native';

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

import DownloadIcon from '@/components/icons/DownloadIcon';
import GradientSeparator from '@/components/icons/GradientSeparator';
import ListIcon from '@/components/icons/ListIcon';
import ShareIcon from '@/components/icons/ShareIcon';
import ThemeButton from '@/components/ThemedButton';
import { ThemedText } from '@/components/ThemedText';
import { Colors, ColorPalette } from '@/constants/Colors';

import Modal from './ThemedModal';
import SuccessIcon from '../icons/SuccessIcon';

interface PaymentSuccessModalProps {
  visible: boolean;
  onClose: () => void;
  paymentData: {
    date: string;
    time: string;
    merchant: string;
    coin: string;
    amount: string;
    adminFee: string;
    total: string;
    network: string;
    swappedCoin: string;
    swappedAmount: string;
    coinBalance: string;
    previousBalance: string;
  };
  onViewTransactionHistory?: () => void;
  onShareReceipt?: () => void;
  onDownloadReceipt?: () => void;
}

const PaymentSuccessModal: React.FC<PaymentSuccessModalProps> = ({
  visible,
  onClose,
  paymentData,
  onViewTransactionHistory,
  onShareReceipt,
  onDownloadReceipt,
}) => {
  return (
    <Modal visible={visible} onClose={onClose} showCloseButton={true}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
        style={{ maxHeight: '100%' }}
      >
        <View className="items-center">
          <View className="items-center mt-2">
            <SuccessIcon />
          </View>
          <ThemedText
            color={Colors.dark.text.primary}
            className="text-xl font-medium text-center mt-6 mb-6"
          >
            Payment Successful!
          </ThemedText>
        </View>

        <View className="flex flex-col gap-3">
          <View className="flex flex-col gap-2 border border-gray-700 p-4">
            <View className="flex flex-row justify-between items-center">
              <ThemedText
                color={Colors.dark.text.muted}
                className="text-lg font-medium text-center"
              >
                Date
              </ThemedText>
              <ThemedText
                color={Colors.dark.text.primary}
                className="text-lg font-medium text-center"
              >
                MAY 16, 2025
              </ThemedText>
            </View>
            <View className="flex flex-row justify-between items-center">
              <ThemedText
                color={Colors.dark.text.muted}
                className="text-lg font-medium text-center"
              >
                Time
              </ThemedText>
              <ThemedText
                color={Colors.dark.text.primary}
                className="text-lg font-medium text-center"
              >
                10:50 PM
              </ThemedText>
            </View>
            <View className="flex flex-row justify-between items-center">
              <ThemedText
                color={Colors.dark.text.muted}
                className="text-lg font-medium text-center"
              >
                Merchant
              </ThemedText>
              <ThemedText
                color={Colors.dark.text.primary}
                className="text-lg font-medium text-center"
              >
                IDRX Money Changer
              </ThemedText>
            </View>
            <View className="flex flex-row justify-between items-center">
              <ThemedText
                color={Colors.dark.text.muted}
                className="text-lg font-medium text-center"
              >
                Coin
              </ThemedText>
              <ThemedText
                color={Colors.dark.text.primary}
                className="text-lg font-medium text-center"
              >
                IDRX
              </ThemedText>
            </View>
            <View className="flex flex-row justify-between items-center">
              <ThemedText
                color={Colors.dark.text.muted}
                className="text-lg font-medium text-center"
              >
                Amount
              </ThemedText>
              <View className="flex flex-row gap-1">
                <ThemedText
                  color={Colors.dark.text.muted}
                  className="text-lg font-medium text-center"
                >
                  IDR
                </ThemedText>
                <ThemedText
                  color={Colors.dark.text.primary}
                  className="text-lg font-medium text-center"
                >
                  100,000
                </ThemedText>
              </View>
            </View>
            <View className="flex flex-row justify-between items-center">
              <ThemedText
                color={Colors.dark.text.muted}
                className="text-lg font-medium text-center"
              >
                Admin Fee
              </ThemedText>
              <View className="flex flex-row gap-1">
                <ThemedText
                  color={Colors.dark.text.muted}
                  className="text-lg font-medium text-center"
                >
                  IDR
                </ThemedText>
                <ThemedText
                  color={Colors.dark.text.primary}
                  className="text-lg font-medium text-center"
                >
                  1,000
                </ThemedText>
              </View>
            </View>

            <GradientSeparator />

            <View className="flex flex-row justify-between items-center">
              <ThemedText
                color={Colors.dark.text.muted}
                className="text-lg font-medium text-center"
              >
                Total
              </ThemedText>
              <View className="flex flex-row gap-1">
                <ThemedText
                  color={Colors.dark.text.muted}
                  className="text-lg font-medium text-center"
                >
                  IDR
                </ThemedText>
                <ThemedText
                  color={Colors.dark.text.primary}
                  className="text-lg font-medium text-center"
                >
                  101,000
                </ThemedText>
              </View>
            </View>
          </View>

          <View className="flex flex-col gap-2 border border-gray-700 p-4">
            <View className="flex flex-row justify-between items-center">
              <ThemedText
                color={Colors.dark.text.muted}
                className="text-lg font-medium text-center"
              >
                Network
              </ThemedText>
              <ThemedText
                color={Colors.dark.text.primary}
                className="text-lg font-medium text-center"
              >
                ETHEREUM
              </ThemedText>
            </View>
            <View className="flex flex-row justify-between items-center">
              <ThemedText
                color={Colors.dark.text.muted}
                className="text-lg font-medium text-center"
              >
                Coin
              </ThemedText>
              <ThemedText
                color={Colors.dark.text.primary}
                className="text-lg font-medium text-center"
              >
                BOME
              </ThemedText>
            </View>
            <View className="flex flex-row justify-between items-center">
              <ThemedText
                color={Colors.dark.text.muted}
                className="text-lg font-medium text-center"
              >
                Swapped Coin
              </ThemedText>
              <ThemedText
                color={Colors.dark.text.primary}
                className="text-lg font-medium text-center"
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
            <View className="flex flex-row items-end gap-2 mt-2">
              <ThemeButton
                variant="primary"
                onPress={onViewTransactionHistory || (() => {})}
                text="View Transaction History"
                LeftIcon={ListIcon}
              />
            </View>
            <View className="flex flex-row items-end gap-2 mt-2">
              <ThemeButton
                variant="secondary"
                onPress={onShareReceipt || (() => {})}
                text="Share as Receipt"
                LeftIcon={ShareIcon}
              />
            </View>
            <View className="flex flex-row items-end gap-2 mt-2">
              <ThemeButton
                variant="secondary"
                onPress={onDownloadReceipt || (() => {})}
                text="Download Receipt"
                LeftIcon={DownloadIcon}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </Modal>
  );
};

export default PaymentSuccessModal;
