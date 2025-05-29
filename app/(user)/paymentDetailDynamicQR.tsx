import React, { useState } from 'react';

import { View, ScrollView, Alert } from 'react-native';

import { useWalletConnectModal } from '@walletconnect/modal-react-native';
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
import { EXCHANGE_RATES } from '@/constants/ExchangeRates';
import {
  Currency,
  SUPPORTED_CURRENCIES,
  SUPPORTED_TOKENS,
  Token,
} from '@/constants/SupportedTokens';
import useWalletStore from '@/store/walletStore';
import { getTokenBalance } from '@/utils/getTokenBalance';
import { currencyFormatter } from '@/utils/numberUtils';
import {
  transferToken,
  waitForTransactionConfirmation,
} from '@/utils/transferToken';

const NETWORKS = [...new Set(SUPPORTED_TOKENS.map((token) => token.network))];
const DEFAULT_VALUE = 'Not Found';
const DEFAULT_NUMBER = '0';
const MERCHANT_ADDRESS = '0x85E0FE0Ef81608A6C266373fC8A3B91dF622AF7a';

const PaymentDetailDynamicQR: React.FC = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { provider } = useWalletConnectModal();
  const { address: userAddress } = useWalletStore();

  const qrData = React.useMemo(
    () => ({
      merchant: (params.merchant ?? DEFAULT_VALUE) as string,
      currency: (params.currency ?? DEFAULT_VALUE) as string,
      amount: (params.amount ?? DEFAULT_NUMBER) as string,
      adminFee: (params.adminFee ?? DEFAULT_NUMBER) as string,
      total: (params.total ?? DEFAULT_NUMBER) as string,
    }),
    [
      params.merchant,
      params.currency,
      params.amount,
      params.adminFee,
      params.total,
    ]
  );

  const [selectedNetwork, setSelectedNetwork] = useState(
    NETWORKS[0] || 'Sepolia'
  );
  const [selectedToken, setSelectedToken] = useState<Token | null>(null);
  const [networkDropdownOpen, setNetworkDropdownOpen] = useState(false);
  const [tokenDropdownOpen, setTokenDropdownOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [currency, setCurrency] = useState<Currency | undefined>();
  const [userBalance, setUserBalance] = useState('0');
  const [transactionHash, setTransactionHash] = useState('');

  React.useEffect(() => {
    const index = SUPPORTED_CURRENCIES.findIndex(
      (item) => item.symbol === qrData.currency
    );
    setCurrency(SUPPORTED_CURRENCIES[index]);
  }, [qrData]);

  const availableTokens = React.useMemo(() => {
    return SUPPORTED_TOKENS.filter(
      (token) => token.network === selectedNetwork
    );
  }, [selectedNetwork]);

  React.useEffect(() => {
    if (availableTokens.length > 0 && !selectedToken) {
      setSelectedToken(availableTokens[0]);
    }
  }, [availableTokens, selectedToken]);

  React.useEffect(() => {
    if (availableTokens.length > 0) {
      const tokenExists = availableTokens.find(
        (token) => token.symbol === selectedToken?.symbol
      );
      if (!tokenExists) {
        setSelectedToken(availableTokens[0]);
      }
    }
  }, [selectedNetwork, availableTokens, selectedToken]);

  React.useEffect(() => {
    const fetchBalance = async () => {
      if (selectedToken && userAddress) {
        try {
          const balance = await getTokenBalance(selectedToken, userAddress);
          setUserBalance(balance);
        } catch (error) {
          console.error('Error fetching balance:', error);
          setUserBalance('0');
        }
      }
    };

    fetchBalance();
  }, [selectedToken, userAddress]);

  const calculateTokenNeeded = () => {
    if (!selectedToken) return '0';

    const totalAmount = parseFloat(qrData.total.replace(/,/g, '')) || 101000;

    const exchangeRates = EXCHANGE_RATES[currency!.symbol! as 'USD' | 'IDR'];
    const rateValue = Number(
      exchangeRates[selectedToken.symbol as keyof typeof exchangeRates] || 1
    );

    return (totalAmount / rateValue).toFixed(8);
  };

  const getExchangeRate = () => {
    if (!selectedToken) return '';

    const exchangeRates = EXCHANGE_RATES[currency!.symbol! as 'USD' | 'IDR'];
    const rate =
      exchangeRates[selectedToken.symbol as keyof typeof exchangeRates] || 1;

    return `1 ${selectedToken.symbol} = ${currency?.symbol} ${rate.toLocaleString()}`;
  };

  const handleNetworkChange = (network: string) => {
    setSelectedNetwork(network);
    setNetworkDropdownOpen(false);

    const tokensForNetwork = SUPPORTED_TOKENS.filter(
      (token) => token.network === network
    );
    if (tokensForNetwork.length > 0) {
      setSelectedToken(tokensForNetwork[0]);
    }
  };

  const handleTokenChange = (tokenSymbol: string) => {
    const token = availableTokens.find((t) => t.symbol === tokenSymbol);
    if (token) {
      setSelectedToken(token);
    }
    setTokenDropdownOpen(false);
  };

  const handleConfirmPayment = async () => {
    if (!selectedToken) {
      return;
    }

    setIsLoading(true);

    const tokenAmount = calculateTokenNeeded();

    try {
      const result = await transferToken({
        token: selectedToken,
        fromAddress: userAddress,
        toAddress: MERCHANT_ADDRESS,
        amount: tokenAmount,
        provider: provider,
      });

      if (result.success && result.transactionHash) {
        setTransactionHash(result.transactionHash);

        // Wait for confirmation
        const confirmed = await waitForTransactionConfirmation(
          result.transactionHash,
          60000 // 1 minute timeout
        );

        if (confirmed) {
          // Refresh balance
          const newBalance = await getTokenBalance(selectedToken, userAddress);
          setUserBalance(newBalance);

          setShowSuccessModal(true);
        } else {
          Alert.alert(
            'Warning',
            'Transaction sent but confirmation is taking longer than expected. Please check your wallet.'
          );
        }
      } else {
        Alert.alert(
          'Transaction Failed',
          result.error || 'Unknown error occurred'
        );
      }

      setShowSuccessModal(true);
    } catch (error) {
      Alert.alert(
        'Payment Error',
        (error as Error).message || 'Failed to process payment'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);

    router.push('/(tabs)/user/home');
  };

  const handleViewTransactionHistory = () => {
    setShowSuccessModal(false);
    router.push('/(tabs)/user/transactionHistory');
  };

  const handleShareReceipt = () => {};

  const handleDownloadReceipt = () => {};

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
          <DetailRow label="Currency" value={currency?.name!} />
          <DetailRow
            label="Amount"
            prefix={currency?.symbol}
            value={currencyFormatter(Number(qrData.amount))}
          />
          <DetailRow
            label="Admin Fee"
            prefix={currency?.symbol}
            value={currencyFormatter(Number(qrData.adminFee))}
          />
          <DetailRow
            label="Total"
            prefix={currency?.symbol}
            value={currencyFormatter(Number(qrData.total))}
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
              setTokenDropdownOpen(false);
            }}
          />
        </View>

        <View className="mb-4">
          <ThemedText
            color={Colors.dark.text.secondary}
            className="text-sm mb-2"
            numbersOnly
          >
            Token
          </ThemedText>
          <View className="flex-row items-center gap-4">
            <View className="flex-1">
              <FilterDropdown
                selectedValue={selectedToken?.symbol || ''}
                options={availableTokens.map((token) => token.symbol)}
                onSelect={handleTokenChange}
                isOpen={tokenDropdownOpen}
                onToggle={() => {
                  setTokenDropdownOpen(!tokenDropdownOpen);
                  setNetworkDropdownOpen(false);
                }}
              />
            </View>
            <ThemedText
              color={Colors.dark.text.primary}
              className="text-base font-medium"
              numbersOnly
            >
              {calculateTokenNeeded()}
            </ThemedText>
          </View>
        </View>

        <View className="mb-8 flex-row gap-2 justify-between items-center">
          <ThemedText color={Colors.dark.text.secondary} className="text-xs">
            Estimated {selectedToken?.symbol} needed: {calculateTokenNeeded()}
          </ThemedText>
          <ThemedText color={Colors.dark.text.secondary} className="text-xs">
            {getExchangeRate()}
          </ThemedText>
        </View>

        <ThemedText
          color={Colors.dark.text.secondary}
          className="text-sm text-center mb-4"
        >
          This will convert {selectedToken?.symbol} to IDR and send to merchant
        </ThemedText>

        <View className="gap-2">
          <ThemeButton
            text={isLoading ? 'Processing...' : 'Confirm Transfer'}
            onPress={handleConfirmPayment}
            variant="primary"
            disabled={isLoading || !selectedToken}
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
      {currency && selectedToken && transactionHash && (
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
            currency: currency,
            amount: `${qrData.currency} ${qrData.amount}`,
            adminFee: `${qrData.currency} ${qrData.adminFee}`,
            total: `${qrData.currency} ${qrData.total}`,
            network: selectedNetwork,
            swappedCoin: selectedToken.symbol,
            swappedAmount: calculateTokenNeeded(),
            coinBalance: userBalance,
            previousBalance: userBalance,
            transactionHash: transactionHash,
          }}
          onViewTransactionHistory={handleViewTransactionHistory}
          onShareReceipt={handleShareReceipt}
          onDownloadReceipt={handleDownloadReceipt}
        />
      )}

      {/* Backdrop for dropdowns */}
      {(networkDropdownOpen || tokenDropdownOpen) && (
        <View
          className="absolute inset-0"
          onTouchStart={() => {
            setNetworkDropdownOpen(false);
            setTokenDropdownOpen(false);
          }}
        />
      )}
    </ScrollView>
  );
};

export default PaymentDetailDynamicQR;
