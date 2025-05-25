import React, { useState } from 'react';

import { View, ScrollView } from 'react-native';

import { useRouter, useLocalSearchParams } from 'expo-router';
import Svg, { Defs, LinearGradient, Rect, Stop } from 'react-native-svg';

import CancelIcon from '@/components/icons/CancelIcon';
import CheckIcon from '@/components/icons/CheckIcon';
import SuccessIcon from '@/components/icons/SuccessIcon';
import ThemeButton from '@/components/ThemedButton';
import { ThemedText } from '@/components/ThemedText';
import FilterDropdown from '@/components/ui/FilterDropdown';
import PaymentSuccessModal from '@/components/ui/PaymentSuccessModal';
import { Colors } from '@/constants/Colors';

const NETWORKS = ['ETHEREUM', 'POLYGON', 'BINANCE SMART CHAIN', 'SOLANA'];
const COINS = {
  ETHEREUM: ['BOME', 'ETH', 'USDT', 'USDC', 'DAI'],
  POLYGON: ['MATIC', 'USDT', 'USDC', 'DAI'],
  'BINANCE SMART CHAIN': ['BNB', 'BUSD', 'USDT', 'CAKE'],
  SOLANA: ['SOL', 'USDC', 'RAY', 'SRM'],
};

const EXCHANGE_RATES = {
  BOME: 5739,
  ETH: 52000000,
  USDT: 15500,
  SOL: 3200000,
  MATIC: 7500,
  BNB: 9500000,
  USDC: 15500,
  DAI: 15500,
  BUSD: 15500,
  CAKE: 75000,
  RAY: 25000,
  SRM: 8500,
};

const PaymentDetailFromQR: React.FC = () => {
  const router = useRouter();
  const params = useLocalSearchParams();

  const qrData = {
    merchant: (params.merchant as string) || 'IDRX Money Changer',
    coin: (params.coin as string) || 'PEPE',
    amount: (params.amount as string) || '100,000',
    adminFee: (params.adminFee as string) || '1,000',
    total: (params.total as string) || '101,000',
  };

  const [selectedNetwork, setSelectedNetwork] = useState('ETHEREUM');
  const [selectedCoin, setSelectedCoin] = useState('BOME');
  const [networkDropdownOpen, setNetworkDropdownOpen] = useState(false);
  const [coinDropdownOpen, setCoinDropdownOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const calculateCoinNeeded = () => {
    const totalIDR = 101000;
    const rate =
      EXCHANGE_RATES[selectedCoin as keyof typeof EXCHANGE_RATES] || 1;
    return (totalIDR / rate).toFixed(8);
  };

  const getExchangeRate = () => {
    const rate =
      EXCHANGE_RATES[selectedCoin as keyof typeof EXCHANGE_RATES] || 1;
    return `1 ${selectedCoin} = IDR ${rate.toLocaleString()}`;
  };

  const handleNetworkChange = (network: string) => {
    setSelectedNetwork(network);

    const availableCoins = COINS[network as keyof typeof COINS] || [];
    if (availableCoins.length > 0) {
      setSelectedCoin(availableCoins[0]);
    }
    setNetworkDropdownOpen(false);
  };

  const handleCoinChange = (coin: string) => {
    setSelectedCoin(coin);
    setCoinDropdownOpen(false);
  };

  const handleConfirmPayment = async () => {
    setIsLoading(true);

    try {
      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Show success modal
      setShowSuccessModal(true);
    } catch (error) {
      console.error('Payment failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
    // Navigate back to home after closing modal
    router.push('/(tabs)/user/home');
  };

  const handleViewTransactionHistory = () => {
    setShowSuccessModal(false);
    router.push('/(tabs)/user/transactionHistory');
  };

  const handleShareReceipt = () => {
    // Implement share functionality
    console.log('Share receipt functionality');
  };

  const handleDownloadReceipt = () => {
    // Implement download functionality
    console.log('Download receipt functionality');
  };

  const handleCancel = () => {
    router.back();
  };

  function GradientSeparator() {
    return (
      <Svg height={3} width="100%">
        <Defs>
          <LinearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <Stop offset="0%" stopColor="#0A0D12" />
            <Stop offset="50%" stopColor="#414651" />
            <Stop offset="100%" stopColor="#0A0D12" />
          </LinearGradient>
        </Defs>
        <Rect width="100%" height={2} fill="url(#grad)" rx={50} ry={50} />
      </Svg>
    );
  }

  const DetailRow = ({
    label,
    value,
    isTotal = false,
    prefix,
  }: {
    label: string;
    value: string;
    valueColor?: string;
    isTotal?: boolean;
    prefix?: string;
  }) => (
    <View>
      {isTotal && (
        <View className="py-5">
          <GradientSeparator />
        </View>
      )}
      <View className="flex-row justify-between items-center py-2">
        <ThemedText
          color={Colors.dark.text.secondary}
          className="text-sm font-medium"
        >
          {label}
        </ThemedText>
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
      </View>
    </View>
  );

  const availableCoins = COINS[selectedNetwork as keyof typeof COINS] || [];

  return (
    <ScrollView className="flex-1 bg-black">
      <View className="flex-1 px-4 py-6">
        <View className="items-center mb-6">
          <SuccessIcon />
        </View>
        <ThemedText
          color={Colors.dark.text.primary}
          className="text-xl font-medium text-center mb-8"
        >
          QR Code Detected
        </ThemedText>

        <View className="bg-black border-gray-700 border-[0.5px] p-4 mb-6">
          <DetailRow label="Merchant" value={qrData.merchant} />
          <DetailRow label="Coin" value={qrData.coin} />
          <DetailRow label="Amount" prefix="IDR" value={qrData.amount} />
          <DetailRow label="Admin Fee" prefix="IDR" value={qrData.adminFee} />
          <DetailRow
            label="Total"
            prefix="IDR"
            value={qrData.total}
            isTotal={true}
          />
        </View>

        <View className="mb-4">
          <ThemedText
            color={Colors.dark.text.secondary}
            className="text-sm mb-2"
            numbersOnly
          >
            Network
          </ThemedText>
          <FilterDropdown
            selectedValue={selectedNetwork}
            options={NETWORKS}
            onSelect={handleNetworkChange}
            isOpen={networkDropdownOpen}
            onToggle={() => {
              setNetworkDropdownOpen(!networkDropdownOpen);
              setCoinDropdownOpen(false);
            }}
          />
        </View>

        <View className="mb-4">
          <ThemedText
            color={Colors.dark.text.secondary}
            className="text-sm mb-2"
            numbersOnly
          >
            Coin
          </ThemedText>
          <View className="flex-row items-center gap-4">
            <View className="flex-1">
              <FilterDropdown
                selectedValue={selectedCoin}
                options={availableCoins}
                onSelect={handleCoinChange}
                isOpen={coinDropdownOpen}
                onToggle={() => {
                  setCoinDropdownOpen(!coinDropdownOpen);
                  setNetworkDropdownOpen(false);
                }}
              />
            </View>
            <ThemedText
              color={Colors.dark.text.primary}
              className="text-base font-medium"
              numbersOnly
            >
              {calculateCoinNeeded()}
            </ThemedText>
          </View>
        </View>

        <View className="mb-8 flex-row gap-2 justify-between items-center">
          <ThemedText color={Colors.dark.text.secondary} className="text-xs">
            Estimated {selectedCoin} needed: {calculateCoinNeeded()}
          </ThemedText>
          <ThemedText color={Colors.dark.text.secondary} className="text-xs">
            {getExchangeRate()}
          </ThemedText>
        </View>

        <ThemedText
          color={Colors.dark.text.secondary}
          className="text-sm text-center mb-4"
        >
          This will convert {selectedCoin} to IDR and send to merchant
        </ThemedText>

        <View className="gap-2">
          <ThemeButton
            text={isLoading ? 'Processing...' : 'Confirm Transfer'}
            onPress={handleConfirmPayment}
            variant="primary"
            disabled={isLoading}
            LeftIcon={CheckIcon}
          />

          <ThemeButton
            text="Cancel"
            onPress={handleCancel}
            variant="secondary"
            disabled={isLoading}
            LeftIcon={CancelIcon}
          />
        </View>

        <View className="h-8" />
      </View>

      {/* Payment Success Modal */}
      <PaymentSuccessModal
        visible={showSuccessModal}
        onClose={handleCloseSuccessModal}
        paymentData={{
          date: new Date()
            .toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            })
            .toUpperCase(),
          time: new Date().toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true,
          }),
          merchant: qrData.merchant,
          coin: qrData.coin,
          amount: `IDR ${qrData.amount}`,
          adminFee: `IDR ${qrData.adminFee}`,
          total: `IDR ${qrData.total}`,
          network: selectedNetwork,
          swappedCoin: selectedCoin,
          swappedAmount: calculateCoinNeeded(),
          coinBalance: '3,240',
          previousBalance: '5,000',
        }}
        onViewTransactionHistory={handleViewTransactionHistory}
        onShareReceipt={handleShareReceipt}
        onDownloadReceipt={handleDownloadReceipt}
      />

      {/* Backdrop for dropdowns */}
      {(networkDropdownOpen || coinDropdownOpen) && (
        <View
          className="absolute inset-0 z-10"
          onTouchStart={() => {
            setNetworkDropdownOpen(false);
            setCoinDropdownOpen(false);
          }}
        />
      )}
    </ScrollView>
  );
};

export default PaymentDetailFromQR;
