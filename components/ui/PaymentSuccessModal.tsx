import React from 'react';

import { View, ScrollView } from 'react-native';

import DownloadIcon from '@/components/icons/DownloadIcon';
import GradientSeparator from '@/components/icons/GradientSeparator';
import ListIcon from '@/components/icons/ListIcon';
import ShareIcon from '@/components/icons/ShareIcon';
import ThemeButton from '@/components/ThemedButton';
import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';
import { Currency } from '@/constants/SupportedTokens';
import { currencyFormatter } from '@/utils/numberUtils';

import Modal from './ThemedModal';
import SuccessIcon from '../icons/SuccessIcon';

interface PaymentSuccessModalProps {
  visible: boolean;
  onClose: () => void;
  paymentData: {
    date: string;
    time: string;
    merchant: string;
    coin?: string;
    currency: Currency;
    amount: string;
    adminFee: string;
    total: string;
    network: string;
    swappedCoin: string;
    swappedAmount: string;
    coinBalance: string;
    previousBalance: string;
    transactionHash?: string;
  };
  onViewTransactionHistory?: () => void;
  onShareReceipt?: () => void;
  onDownloadReceipt?: () => void;
}

const DetailRow = ({
  label,
  value,
  isTotal = false,
  prefix,
  subLabel,
  subValue,
}: {
  label: string;
  value?: string;
  valueColor?: string;
  isTotal?: boolean;
  prefix?: string;
  subLabel?: string;
  subValue?: string;
}) => (
  <View>
    {isTotal && (
      <View className="py-2">
        <GradientSeparator />
      </View>
    )}
    <View className="flex-row justify-between py-2">
      <ThemedText
        color={Colors.dark.text.secondary}
        className="text-sm font-medium"
      >
        {label}
      </ThemedText>
      <View className="flex items-end">
        <View className="flex flex-row gap-2">
          <ThemedText
            color={Colors.dark.text.secondary}
            className="text-sm font-medium"
            numbersOnly
          >
            {prefix}
          </ThemedText>
          <ThemedText
            color={Colors.dark.text.primary}
            className="text-sm font-medium"
            numbersOnly
          >
            {value}
          </ThemedText>
        </View>

        {subLabel && (
          <View className="flex flex-row gap-2 mt-2">
            <ThemedText
              color={Colors.dark.text.secondary}
              className="text-xs font-medium"
            >
              {subLabel}
            </ThemedText>
            <ThemedText
              color={Colors.dark.text.secondary}
              className="text-xs font-medium"
              numbersOnly
            >
              {subValue}
            </ThemedText>
          </View>
        )}
      </View>
    </View>
  </View>
);

const PaymentSuccessModal: React.FC<PaymentSuccessModalProps> = ({
  visible,
  onClose,
  paymentData,
  onViewTransactionHistory,
  onShareReceipt,
  onDownloadReceipt,
}) => {
  const {
    date,
    adminFee,
    amount,
    coinBalance,
    merchant,
    network,
    previousBalance,
    swappedAmount,
    swappedCoin,
    time,
    total,
    currency,
  } = paymentData;

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
          <View className="flex flex-col border-[0.5px] border-gray-700 p-4">
            <DetailRow label="Date" value={date} />
            <DetailRow label="Time" value={time} />
            <DetailRow label="Merchant" value={merchant} />
            <DetailRow label="Currency" value={currency.name} />
            <DetailRow
              label="Amount"
              prefix={currency.symbol}
              value={currencyFormatter(Number(amount))}
            />
            <DetailRow
              label="Admin Fee"
              prefix={currency.symbol}
              value={currencyFormatter(Number(adminFee))}
            />
            <DetailRow
              label="Total"
              prefix={currency.symbol}
              value={currencyFormatter(Number(total))}
              isTotal
            />
          </View>
          <View className="flex flex-col border-[0.5px] border-gray-700 p-4">
            <DetailRow label="Network" value={network} />
            <DetailRow label="Coin" value={swappedCoin} />
            <DetailRow label="Amount" value={swappedAmount} />
            <DetailRow
              label="Coin Balance"
              value={coinBalance}
              isTotal
              subLabel="From"
              subValue={previousBalance}
            />
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
