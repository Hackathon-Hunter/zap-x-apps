import React, { useEffect } from 'react';

import { View, Pressable } from 'react-native';

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

import { ThemedText } from '@/components/ThemedText';
import { Colors, ColorPalette } from '@/constants/Colors';

import Modal from './ThemedModal';

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
  const checkmarkScale = useSharedValue(0);
  const checkmarkRotate = useSharedValue(-45);

  useEffect(() => {
    if (visible) {
      // Animate checkmark
      checkmarkScale.value = withSpring(1, {
        damping: 15,
        stiffness: 200,
      });
      checkmarkRotate.value = withSequence(
        withTiming(15, { duration: 200 }),
        withTiming(0, { duration: 100 })
      );
    } else {
      checkmarkScale.value = 0;
      checkmarkRotate.value = -45;
    }
  }, [visible]);

  const checkmarkAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { scale: checkmarkScale.value },
        { rotate: `${checkmarkRotate.value}deg` },
      ],
    };
  });

  const CheckmarkIcon = () => (
    <Animated.View
      className="items-center justify-center"
      style={checkmarkAnimatedStyle}
    >
      <View
        className="w-20 h-20 rounded-full items-center justify-center"
        style={{ backgroundColor: ColorPalette.green.accent }}
      >
        <View
          className="w-6 h-3 border-l-2 border-b-2 -mt-1.5 ml-1"
          style={{
            borderColor: Colors.dark.text.primary,
            transform: [{ rotate: '-45deg' }],
          }}
        />
      </View>
    </Animated.View>
  );

  const DetailRow = ({
    label,
    value,
    valueColor = Colors.dark.text.primary,
  }: {
    label: string;
    value: string;
    valueColor?: string;
  }) => (
    <View className="flex-row justify-between items-center py-2">
      <ThemedText color={Colors.dark.text.secondary} className="text-sm">
        {label}
      </ThemedText>
      <ThemedText
        color={valueColor}
        className="text-sm font-medium"
        numbersOnly={/^[\d\s,.-]+$/.test(value)}
      >
        {value}
      </ThemedText>
    </View>
  );

  const ActionButton = ({
    title,
    onPress,
    iconComponent,
  }: {
    title: string;
    onPress?: () => void;
    iconComponent?: React.ReactNode;
  }) => (
    <Pressable
      className="bg-gray-900 rounded-xl border border-gray-700"
      onPress={onPress}
    >
      <View className="flex-row items-center justify-center py-4 px-5 gap-3">
        {iconComponent && <View className="w-4 h-4">{iconComponent}</View>}
        <ThemedText
          color={Colors.dark.text.primary}
          className="text-base font-medium"
        >
          {title}
        </ThemedText>
      </View>
    </Pressable>
  );

  // Simple icon components using View elements
  const DocumentIcon = () => (
    <View className="w-4 h-4 relative">
      <View
        className="absolute w-3 h-3.5 border border-gray-400"
        style={{ backgroundColor: 'transparent' }}
      />
      <View className="absolute w-2 h-0.5 bg-gray-400 top-1 left-0.5" />
      <View className="absolute w-2 h-0.5 bg-gray-400 top-1.5 left-0.5" />
      <View className="absolute w-1.5 h-0.5 bg-gray-400 top-2 left-0.5" />
    </View>
  );

  const ShareIcon = () => (
    <View className="w-4 h-4 relative">
      <View className="absolute w-2 h-2 bg-gray-400 rounded-full" />
      <View className="absolute w-0.5 h-1.5 bg-gray-400 right-1 top-0.5" />
      <View className="absolute w-0.5 h-1.5 bg-gray-400 right-1.5 top-1" />
    </View>
  );

  const DownloadIcon = () => (
    <View className="w-4 h-4 relative">
      <View className="absolute w-0.5 h-2 bg-gray-400 left-1.5" />
      <View className="absolute w-1 h-0.5 bg-gray-400 left-1.5 top-2.5" />
      <View className="absolute w-2.5 h-1 bg-gray-400 rounded-sm top-3" />
    </View>
  );

  return (
    <Modal visible={visible} onClose={onClose} showCloseButton={true}>
      <View className="items-center">
        {/* Success Icon */}
        <View className="items-center mt-2">
          <CheckmarkIcon />
        </View>

        {/* Title */}
        <ThemedText
          color={Colors.dark.text.primary}
          className="text-xl font-medium text-center mt-6 mb-6"
        >
          Payment Successful!
        </ThemedText>

        {/* Payment Details */}
        <View className="w-full bg-gray-900 rounded-xl p-4 mb-6">
          <DetailRow label="Date" value={paymentData.date} />
          <DetailRow label="Time" value={paymentData.time} />
          <DetailRow label="Merchant" value={paymentData.merchant} />
          <DetailRow label="Coin" value={paymentData.coin} />
          <DetailRow label="Amount" value={paymentData.amount} />
          <DetailRow label="Admin Fee" value={paymentData.adminFee} />

          <View className="h-0.5 bg-gray-700 my-2" />

          <DetailRow
            label="Total"
            value={paymentData.total}
            valueColor={Colors.dark.text.primary}
          />

          <View className="h-0.5 bg-gray-700 my-2" />

          <DetailRow label="Network" value={paymentData.network} />
          <DetailRow label="Coin" value={paymentData.swappedCoin} />
          <DetailRow label="Swapped Coin" value={paymentData.swappedAmount} />

          <View className="flex-row justify-between items-start py-2">
            <ThemedText color={Colors.dark.text.secondary} className="text-sm">
              Coin Balance
            </ThemedText>
            <View className="items-end">
              <ThemedText
                color={Colors.dark.text.primary}
                className="text-sm font-medium"
                numbersOnly
              >
                {paymentData.coinBalance}
              </ThemedText>
              <ThemedText
                color={Colors.dark.text.secondary}
                className="text-xs"
              >
                From {paymentData.previousBalance}
              </ThemedText>
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View className="w-full gap-3">
          <ActionButton
            title="View Transaction History"
            onPress={onViewTransactionHistory}
            iconComponent={<DocumentIcon />}
          />

          <ActionButton
            title="Share as Receipt"
            onPress={onShareReceipt}
            iconComponent={<ShareIcon />}
          />

          <ActionButton
            title="Download Receipt"
            onPress={onDownloadReceipt}
            iconComponent={<DownloadIcon />}
          />
        </View>
      </View>
    </Modal>
  );
};

export default PaymentSuccessModal;
