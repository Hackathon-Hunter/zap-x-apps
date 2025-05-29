import React, { useState, useEffect } from 'react';

import { View, Alert } from 'react-native';

import { Camera, CameraView } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';

import CameraPlaceholder from '@/components/ui/CameraPlaceholder';
import PermissionScreen from '@/components/ui/PermissionScreen';
import ScanControls from '@/components/ui/ScanControls';
import ScanningOverlay from '@/components/ui/ScanningOverlay';
import ScanStatusIndicator from '@/components/ui/ScanStatusIndicator';

// Type definitions for valid QR data structures
interface DynamicQRData {
  type: 'dynamic';
  merchant: string;
  currency: string;
  amount: string;
  adminFee: string;
  total: string;
}

interface StaticQRData {
  type: 'static';
  merchant: string;
  currency: 'IDR';
  adminFee: string;
}

type ValidQRData = DynamicQRData | StaticQRData;

const UserScanToPay = () => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const router = useRouter();

  useEffect(() => {
    getCameraPermissions();
  }, []);

  const getCameraPermissions = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    setHasPermission(status === 'granted');
  };

  // Strict validation function
  const validateQRData = (data: any): data is ValidQRData => {
    // Must be an object
    if (!data || typeof data !== 'object') {
      return false;
    }

    // Must have exact type field
    if (!data.type || (data.type !== 'dynamic' && data.type !== 'static')) {
      return false;
    }

    if (
      !data.merchant ||
      typeof data.merchant !== 'string' ||
      data.merchant.trim() === ''
    ) {
      return false;
    }

    if (data.type === 'dynamic') {
      const requiredFields = ['currency', 'amount', 'adminFee', 'total'];
      for (const field of requiredFields) {
        if (
          !data[field] ||
          typeof data[field] !== 'string' ||
          data[field].trim() === ''
        ) {
          return false;
        }
      }

      // Check that we don't have extra unexpected fields (optional, but good practice)
      const allowedFields = [
        'type',
        'merchant',
        'currency',
        'amount',
        'adminFee',
        'total',
      ];
      const dataKeys = Object.keys(data);
      for (const key of dataKeys) {
        if (!allowedFields.includes(key)) {
          return false;
        }
      }

      return true;
    } else if (data.type === 'static') {
      // Static QR validations
      if (data.currency !== 'IDR') {
        return false;
      }

      if (
        !data.adminFee ||
        typeof data.adminFee !== 'string' ||
        data.adminFee.trim() === ''
      ) {
        return false;
      }

      // Check that we don't have extra unexpected fields
      const allowedFields = ['type', 'merchant', 'currency', 'adminFee'];
      const dataKeys = Object.keys(data);
      for (const key of dataKeys) {
        if (!allowedFields.includes(key)) {
          return false;
        }
      }

      return true;
    }
    return false;
  };

  const handleBarCodeScanned = ({ data }: { data: string }) => {
    if (scanned) return;

    setScanned(true);
    setIsScanning(false);

    try {
      let qrData;

      // Only try JSON parsing - don't use parseQRData utility
      try {
        qrData = JSON.parse(data);
      } catch (parseError) {
        Alert.alert(
          'Invalid QR Code',
          'This QR code format is not supported. Please scan a valid payment QR code.',
          [
            { text: 'Scan Again', onPress: resetScanner },
            { text: 'Cancel', onPress: () => {} },
          ]
        );
        return;
      }

      // Strict validation
      if (!validateQRData(qrData)) {
        Alert.alert(
          'Invalid QR Code',
          'This QR code is not a valid payment QR code. Please scan a QR code from a supported merchant.',
          [
            { text: 'Scan Again', onPress: resetScanner },
            { text: 'Cancel', onPress: () => {} },
          ]
        );
        return;
      }

      // Navigate based on type
      if (qrData.type === 'dynamic') {
        const dynamicData = qrData as DynamicQRData;
        router.push({
          pathname: '/(user)/paymentDetailDynamicQR',
          params: {
            merchant: dynamicData.merchant,
            currency: dynamicData.currency,
            amount: dynamicData.amount,
            adminFee: dynamicData.adminFee,
            total: dynamicData.total,
          },
        });
      } else if (qrData.type === 'static') {
        const staticData = qrData as StaticQRData;
        router.push({
          pathname: '/(user)/paymentDetailStaticQR',
          params: {
            merchant: staticData.merchant,
            currency: staticData.currency,
            adminFee: staticData.adminFee,
          },
        });
      }
    } catch (error) {
      Alert.alert(
        'QR Code Error',
        "Failed to process the QR code. Please ensure it's a valid payment QR code.",
        [
          { text: 'Scan Again', onPress: resetScanner },
          { text: 'Cancel', onPress: () => {} },
        ]
      );
    }
  };

  const resetScanner = () => {
    setScanned(false);
    setIsScanning(false);
  };

  const startScanning = () => {
    setIsScanning(true);
    setScanned(false);
  };

  const stopScanning = () => {
    setIsScanning(false);
  };

  const pickImageFromGallery = async () => {
    try {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (status !== 'granted') {
        Alert.alert(
          'Permission Required',
          'Gallery access is needed to upload QR codes from your photos.'
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled) {
        Alert.alert(
          'Image Selected',
          'QR code processing from gallery would happen here in a real implementation.'
        );
      }
    } catch {
      Alert.alert('Error', 'Failed to pick image from gallery.');
    }
  };

  if (hasPermission !== true) {
    return (
      <PermissionScreen
        hasPermission={hasPermission}
        onRequestPermission={getCameraPermissions}
      />
    );
  }

  return (
    <View className="flex-1">
      <View className="flex-1 relative mb-40">
        {isScanning ? (
          <CameraView
            style={{ flex: 1 }}
            facing="back"
            barcodeScannerSettings={{ barcodeTypes: ['qr'] }}
            onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
          >
            <ScanningOverlay isScanning={isScanning} />
            <ScanStatusIndicator isScanning={isScanning} />
          </CameraView>
        ) : (
          <CameraPlaceholder />
        )}
      </View>

      <ScanControls
        isScanning={isScanning}
        onStartScanning={startScanning}
        onStopScanning={stopScanning}
        onPickFromGallery={pickImageFromGallery}
      />
    </View>
  );
};

export default UserScanToPay;
