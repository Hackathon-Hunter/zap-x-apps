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
import { Colors } from '@/constants/Colors';

const DEFAULT_CURRENCY_OPTIONS = ['IDR', 'USD'];

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
  const [isQRModalVisible, setQRModalVisible] = useState(false);
  const [hasStoragePermission, setHasStoragePermission] = useState(false);

  const options = ['IDR', 'USD'];

  const toggleDropdown = () => setIsDropdownVisible(!isDropdownVisible);

  const handleSelectOption = (option: string) => {
    setSelectedCurrency(option);
    setIsDropdownVisible(false);
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
              onChangeText={setAmount}
              keyboardType="numeric"
              placeholder="0"
              placeholderTextColor="#aaa"
              className="text-5xl text-white font-semibold"
              style={{ flex: 1 }}
            />
            <View>
              <FilterDropdown
                selectedValue={DEFAULT_CURRENCY_OPTIONS[0]}
                options={DEFAULT_CURRENCY_OPTIONS}
                onSelect={() => {}}
                isOpen={false}
                onToggle={() => {}}
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
                IDR
              </ThemedText>
              <ThemedText
                color={Colors.dark.text.primary}
                className="text-right"
              >
                100.000
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
                IDR
              </ThemedText>
              <ThemedText
                color={Colors.dark.text.primary}
                className="text-right"
              >
                100.000
              </ThemedText>
            </View>
          </View>
        </View>

        {/* Generate QR Button */}
        <ThemeButton
          variant="primary"
          onPress={() => setQRModalVisible(true)}
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
          onPress={() => {}}
          text="Generate Static QR"
          LeftIcon={QRIcon}
        />
      </View>

      {/* Dropdown */}
      {isDropdownVisible && (
        <View className="absolute top-16 right-6 left-6 bg-black border border-gray-700 rounded-md z-10 max-h-40">
          <ScrollView nestedScrollEnabled={true}>
            {options.map((option) => (
              <Pressable
                key={option}
                onPress={() => handleSelectOption(option)}
                className="p-3 border-b border-gray-800 last:border-b-0 items-center"
              >
                <ThemedText
                  color={
                    selectedCurrency === option
                      ? Colors.dark.text.primary
                      : Colors.dark.text.secondary
                  }
                  className="text-sm text-center"
                >
                  {option}
                </ThemedText>
              </Pressable>
            ))}
          </ScrollView>
        </View>
      )}
      <DynamicQRModal
        visible={isQRModalVisible}
        onClose={() => setQRModalVisible(false)}
        qrData={{
          type: 'dynamic',
          merchant: 'Kos Bu Diarto',
          stableCoin: 'IDR',
          amount: '50000',
          adminFee: '2000',
          total: '7000',
        }}
        onDownloadReceipt={() => {
          saveQrToDisk();
        }}
      />
    </ScrollView>
  );
};

export default GenerateQRForm;
