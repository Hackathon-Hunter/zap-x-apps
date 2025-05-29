import React, { useEffect, useRef, useState } from 'react';

import {
  View,
  StyleSheet,
  Pressable,
  TextInput,
  ScrollView,
  Platform,
  PermissionsAndroid,
  ToastAndroid,
  Alert,
} from 'react-native';

import { CameraRoll } from '@react-native-camera-roll/camera-roll';
import * as RNFS from 'react-native-fs';
import Svg, { Defs, LinearGradient, Rect, Stop } from 'react-native-svg';

import GradientSeparator from '@/components/icons/GradientSeparator';
import QRIcon from '@/components/icons/QRIcon';
import WalletIcon from '@/components/icons/WalletIcon';
import ThemeButton from '@/components/ThemedButton';
import { ThemedText } from '@/components/ThemedText';
import DynamicQRModal from '@/components/ui/DynamicQRModal';
import FilterDropdown from '@/components/ui/FilterDropdown';
import StaticQRModal from '@/components/ui/StaticQRModal';
import { Colors } from '@/constants/Colors';

const DEFAULT_CURRENCY_OPTIONS = ['IDR', 'USD'];
const ADMIN_FEE_PERCENTAGE = 0.1; // 4% admin fee
const MIN_TRANSFER_IDR = 10000;
const MAX_TRANSFER_IDR = 1000000;
const MIN_TRANSFER_USD = 1;
const MAX_TRANSFER_USD = 100;

function GradientBorderBox() {
  return (
    <Svg style={StyleSheet.absoluteFill} preserveAspectRatio="none">
      <Defs>
        <LinearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <Stop offset="0%" stopColor="#414651" />
          <Stop offset="50%" stopColor="#FFFFFF" />
          <Stop offset="100%" stopColor="#414651" />
        </LinearGradient>
      </Defs>
      <Rect width="100%" height="100%" fill="url(#grad)" />
    </Svg>
  );
}

const GenerateQRForm = () => {
  const [amount, setAmount] = useState('');
  const svgRef = useRef<any>(null);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState('IDR');
  const [isDynamicQRModalVisible, setDynamicQRModalVisible] = useState(false);
  const [isStaticQRModalVisible, setStaticQRModalVisible] = useState(false);
  const [hasStoragePermission, setHasStoragePermission] = useState(false);

  // Calculate admin fee and total
  const calculateAdminFee = (amountValue: number) => {
    return Math.round(amountValue * ADMIN_FEE_PERCENTAGE);
  };

  const calculateTotal = (amountValue: number) => {
    return amountValue + calculateAdminFee(amountValue);
  };

  // Format number with thousand separators
  const formatNumber = (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  };

  // Get min and max values based on currency
  const getMinMax = () => {
    if (selectedCurrency === 'IDR') {
      return {
        min: MIN_TRANSFER_IDR,
        max: MAX_TRANSFER_IDR,
        minFormatted: formatNumber(MIN_TRANSFER_IDR),
        maxFormatted: formatNumber(MAX_TRANSFER_IDR),
      };
    } else {
      return {
        min: MIN_TRANSFER_USD,
        max: MAX_TRANSFER_USD,
        minFormatted: MIN_TRANSFER_USD.toString(),
        maxFormatted: MAX_TRANSFER_USD.toString(),
      };
    }
  };

  const toggleDropdown = () => setIsDropdownVisible(!isDropdownVisible);

  const handleSelectOption = (option: string) => {
    setSelectedCurrency(option);
    setIsDropdownVisible(false);
    // Clear amount when currency changes
    setAmount('');
  };

  const handleGenerateDynamicQR = () => {
    const numericAmount = parseFloat(amount.replace(/\./g, '').replace(/,/g, ''));

    if (!amount || isNaN(numericAmount) || numericAmount === 0) {
      Alert.alert('Error', 'Please enter a valid amount');
      return;
    }

    const { min, max } = getMinMax();

    if (numericAmount < min) {
      Alert.alert('Error', `Minimum amount is ${selectedCurrency} ${getMinMax().minFormatted}`);
      return;
    }

    if (numericAmount > max) {
      Alert.alert('Error', `Maximum amount is ${selectedCurrency} ${getMinMax().maxFormatted}`);
      return;
    }

    setDynamicQRModalVisible(true);
  };

  const handleAmountChange = (text: string) => {
    // Remove non-numeric characters except dots for thousand separators
    let cleanedText = text.replace(/[^0-9]/g, '');

    // Add thousand separators
    if (cleanedText) {
      const numericValue = parseInt(cleanedText, 10);
      if (!isNaN(numericValue)) {
        setAmount(formatNumber(numericValue));
      } else {
        setAmount('');
      }
    } else {
      setAmount('');
    }
  };

  useEffect(() => {
    const requestPermissions = async () => {
      if (Platform.OS === 'android') {
        try {
          await requestAndroidPermission();
        } catch (error) {
          console.log('Permission request error:', error);
        }
      }
    };

    requestPermissions();
  }, []);

  const requestAndroidPermission = async () => {
    if (Platform.OS !== 'android') return true;

    try {
      // For Android 13+ (API 33+)
      if (Platform.Version >= 33) {
        const readMediaImages = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES
        );
        const readMediaVideo = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO
        );
        return (
          readMediaImages === PermissionsAndroid.RESULTS.GRANTED &&
          readMediaVideo === PermissionsAndroid.RESULTS.GRANTED
        );
      }
      // For Android <13 (legacy)
      else {
        const writePermission = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
        );
        const readPermission = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
        );
        return (
          writePermission === PermissionsAndroid.RESULTS.GRANTED &&
          readPermission === PermissionsAndroid.RESULTS.GRANTED
        );
      }
    } catch (err) {
      console.error('Permission error:', err);
      return false;
    }
  };

  const saveQrToDisk = async () => {
    try {
      const hasPermission = await requestAndroidPermission();
      if (!hasPermission) {
        ToastAndroid.show('Permission denied!', ToastAndroid.SHORT);
        return;
      }

      if (svgRef.current) {
        svgRef.current.toDataURL(async (data: string) => {
          try {
            const filePath = `${RNFS.CachesDirectoryPath}/my-qr-code.png`;
            await RNFS.writeFile(filePath, data, 'base64');
            await CameraRoll.save(filePath, { type: 'photo' });
            ToastAndroid.show('Saved to gallery!', ToastAndroid.SHORT);
          } catch (error) {
            console.log('Save failed', error);
          }
        });
      } else {
        console.warn('QR Code ref is not available yet.');
      }
    } catch (error) {
      console.log('Save error:', error);
    }
  };

  // Get dynamic QR data based on current amount
  const getDynamicQRData = () => {
    const numericAmount = parseFloat(amount.replace(/\./g, '').replace(/,/g, '')) || 0;
    const adminFee = calculateAdminFee(numericAmount);
    const total = calculateTotal(numericAmount);

    return {
      type: 'dynamic' as const,
      merchant: 'Kos Bu Diarto',
      currency: selectedCurrency,
      amount: numericAmount.toString(),
      adminFee: adminFee.toString(),
      total: total.toString(),
    };
  };

  const { minFormatted, maxFormatted } = getMinMax();

  return (
    <ScrollView>
      <GradientBorderBox />
      <View className="bg-black mx-[0.5px] my-[0.5px]">
        {/* Amount Input & Currency Dropdown */}
        <View className="flex-col mb-4 px-4 pt-6">
          <ThemedText className="text-lg" color={Colors.dark.text.secondary}>
            Amount
          </ThemedText>
          <View className="flex-row items-center">
            <TextInput
              value={amount}
              onChangeText={handleAmountChange}
              keyboardType="numeric"
              placeholder="0"
              placeholderTextColor="#aaa"
              className="text-5xl text-white font-semibold"
              style={{ flex: 1 }}
            />
            <View>
              <FilterDropdown
                selectedValue={selectedCurrency}
                options={DEFAULT_CURRENCY_OPTIONS}
                onSelect={handleSelectOption}
                isOpen={isDropdownVisible}
                onToggle={toggleDropdown}
                LeftIcon={WalletIcon}
              />
            </View>
          </View>
        </View>

        {/* Transfer Info */}
        <View className="flex-row mb-6 px-4 gap-32">
          <View className="flex-col items-start">
            <ThemedText
              className="text-base text-right"
              color={Colors.dark.text.secondary}
            >
              Min. Transfer
            </ThemedText>
            <View className="flex-row items-end gap-2">
              <ThemedText
                color={Colors.dark.text.secondary}
                className="text-right text-xs"
              >
                {selectedCurrency}
              </ThemedText>
              <ThemedText
                color={Colors.dark.text.primary}
                className="text-right"
              >
                {minFormatted}
              </ThemedText>
            </View>
          </View>
          <View className="flex-col items-start">
            <ThemedText
              color={Colors.dark.text.secondary}
              className="text-base text-right"
            >
              Max. Transfer
            </ThemedText>
            <View className="flex-row items-end gap-2">
              <ThemedText
                color={Colors.dark.text.secondary}
                className="text-right text-xs"
              >
                {selectedCurrency}
              </ThemedText>
              <ThemedText
                color={Colors.dark.text.primary}
                className="text-right"
              >
                {maxFormatted}
              </ThemedText>
            </View>
          </View>
        </View>

        {/* Generate QR Button */}
        <ThemeButton
          variant="primary"
          onPress={handleGenerateDynamicQR}
          text="Generate QR"
          RightIcon={QRIcon}
        />
      </View>

      {/* OR Separator */}
      <View className="flex-row justify-center items-center py-4 bg-black">
        <View className="flex-1 max-w-[100px] mx-2">
          <GradientSeparator />
        </View>
        <ThemedText color={Colors.dark.text.primary}> OR </ThemedText>
        <View className="flex-1 max-w-[100px] mx-2">
          <GradientSeparator />
        </View>
      </View>

      {/* Generate Static QR */}
      <View className="bg-black">
        <ThemeButton
          variant="primary"
          onPress={() => setStaticQRModalVisible(true)}
          text="Generate Static QR"
          LeftIcon={QRIcon}
        />
      </View>

      {/* Dynamic QR Modal */}
      <DynamicQRModal
        visible={isDynamicQRModalVisible}
        onClose={() => setDynamicQRModalVisible(false)}
        qrData={getDynamicQRData()}
        onDownloadReceipt={() => {
          saveQrToDisk();
        }}
      />

      {/* Static QR Modal */}
      <StaticQRModal
        visible={isStaticQRModalVisible}
        onClose={() => setStaticQRModalVisible(false)}
        qrData={{
          type: 'static',
          merchant: 'Kos Bu Diarto',
          currency: selectedCurrency,
          adminFee: '2000',
        }}
        onDownloadReceipt={() => {
          saveQrToDisk();
        }}
      />
    </ScrollView>
  );
};

export default GenerateQRForm;