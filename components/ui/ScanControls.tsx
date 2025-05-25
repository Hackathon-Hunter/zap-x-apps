import React, { useEffect } from 'react';

import { View } from 'react-native';

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';

import QRIcon from '@/components/icons/QRIcon';
import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';

import GalleryIcon from '../icons/GalleryIcon';
import ThemeButton from '../ThemedButton';

interface ScanControlsProps {
  isScanning: boolean;
  onStartScanning: () => void;
  onStopScanning: () => void;
  onPickFromGallery: () => void;
}

const ScanControls: React.FC<ScanControlsProps> = ({
  isScanning,
  onStartScanning,
  onStopScanning,
  onPickFromGallery,
}) => {
  const buttonScale = useSharedValue(1);

  useEffect(() => {
    buttonScale.value = withSpring(isScanning ? 1.1 : 1, {
      damping: 15,
      stiffness: 150,
    });
  }, [buttonScale, isScanning]);

  const buttonAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: buttonScale.value }],
    };
  });

  const handleScanPress = () => {
    if (isScanning) {
      onStopScanning();
    } else {
      onStartScanning();
    }
  };

  return (
    <View className="absolute bottom-10 left-0 right-0 bg-black">
      <View className="flex-row justify-center items-center">
        <Animated.View style={buttonAnimatedStyle}>
          <ThemeButton
            text={
              isScanning ? 'Stop scanning the QR code' : 'Start Scan QR code'
            }
            onPress={handleScanPress}
            variant="secondary"
            LeftIcon={!isScanning ? QRIcon : undefined}
          />
        </Animated.View>
      </View>

      {/* Alternative option */}
      <View className="items-center pb-8">
        <ThemedText color={Colors.dark.text.secondary} className="text-sm mb-4">
          OR
        </ThemedText>

        <View className="w-full">
          <ThemeButton
            onPress={onPickFromGallery}
            text="Upload QR from Gallery"
            LeftIcon={GalleryIcon}
          />
        </View>
      </View>
    </View>
  );
};

export default ScanControls;
