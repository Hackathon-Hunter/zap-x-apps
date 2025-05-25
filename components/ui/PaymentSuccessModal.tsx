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
    </Modal>
  );
};

export default PaymentSuccessModal;
