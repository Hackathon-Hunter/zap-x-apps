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

  const handleBarCodeScanned = ({ data }: { type: string; data: string }) => {
    if (scanned) return;

    setScanned(true);
    setIsScanning(false);

    Alert.alert(
      'QR Code Scanned',
      `Scanned data: ${data.substring(0, 100)}${data.length > 100 ? '...' : ''}`,
      [
        { text: 'Scan Again', onPress: resetScanner },
        { text: 'OK', onPress: resetScanner },
      ]
    );
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
    try {
      router.push({
        pathname: '/(user)/paymentDetailStaticQR',
        params: {
          merchant: 'IDRX Money Changer',
          amount: '100,000',
          adminFee: '1,000',
          total: '101,000',
        },
      });
    } catch (error) {
      console.log(error);
    }
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
