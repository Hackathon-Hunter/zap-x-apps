import React from 'react';

import { View } from 'react-native';

import QRIcon from '@/components/icons/QRIcon';
import { ThemedText } from '@/components/ThemedText';
import { Colors, ColorPalette } from '@/constants/Colors';

const CameraPlaceholder: React.FC = () => {
  return (
    <View className="flex-1 justify-center items-center bg-black px-6">
      <View className="w-80 h-80 border-2 border-dashed border-gray-600 rounded-2xl justify-center items-center">
        <QRIcon color={ColorPalette.gray[400]} width={80} height={80} />
        <ThemedText
          color={Colors.dark.text.secondary}
          className="mt-6 text-center text-base max-w-64"
        >
          Position QR code within the frame to start scanning
        </ThemedText>
        <ThemedText
          color={Colors.dark.text.secondary}
          className="mt-2 text-center text-sm max-w-64"
        >
          Tap the scan button below to activate camera
        </ThemedText>
      </View>
    </View>
  );
};

export default CameraPlaceholder;
