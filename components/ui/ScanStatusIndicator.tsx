import React, { useEffect } from 'react';

import { View } from 'react-native';

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

import { ThemedText } from '@/components/ThemedText';
import { Colors, ColorPalette } from '@/constants/Colors';

interface ScanStatusIndicatorProps {
  isScanning: boolean;
}

const ScanStatusIndicator: React.FC<ScanStatusIndicatorProps> = ({
  isScanning,
}) => {
  const pulseOpacity = useSharedValue(1);

  useEffect(() => {
    if (isScanning) {
      pulseOpacity.value = withRepeat(
        withTiming(0.3, { duration: 800 }),
        -1,
        true
      );
    } else {
      pulseOpacity.value = 1;
    }
  }, [isScanning]);

  const pulseStyle = useAnimatedStyle(() => {
    return {
      opacity: pulseOpacity.value,
    };
  });

  return (
    <View className="absolute bottom-32 left-0 right-0 items-center">
      <View className="flex-row items-center bg-black bg-opacity-80 px-6 py-3 rounded-full">
        <View className="w-3 h-3 mr-3">
          {isScanning ? (
            <Animated.View
              style={[
                pulseStyle,
                {
                  width: 12,
                  height: 12,
                  backgroundColor: ColorPalette.green.accent,
                  borderRadius: 6,
                },
              ]}
            />
          ) : (
            <View className="w-3 h-3 bg-gray-400 rounded-full" />
          )}
        </View>
        <ThemedText
          color={Colors.dark.text.primary}
          className="text-sm font-medium"
        >
          {isScanning
            ? 'Scanning the QR code'
            : 'Position QR code within frame'}
        </ThemedText>
      </View>
    </View>
  );
};

export default ScanStatusIndicator;
