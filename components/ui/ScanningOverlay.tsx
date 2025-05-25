import React, { useEffect } from 'react';

import { View, StyleSheet } from 'react-native';

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withSequence,
} from 'react-native-reanimated';

import { ColorPalette } from '@/constants/Colors';

interface ScanningOverlayProps {
  isScanning: boolean;
}

const ScanningOverlay: React.FC<ScanningOverlayProps> = ({ isScanning }) => {
  const scanLinePosition = useSharedValue(0);
  const pulseScale = useSharedValue(1);

  useEffect(() => {
    if (isScanning) {
      // Start scanning line animation
      scanLinePosition.value = withRepeat(
        withSequence(
          withTiming(1, { duration: 2000 }),
          withTiming(0, { duration: 0 })
        ),
        -1,
        false
      );

      // Start pulse animation for corners
      pulseScale.value = withRepeat(
        withSequence(
          withTiming(1.1, { duration: 1000 }),
          withTiming(1, { duration: 1000 })
        ),
        -1,
        true
      );
    } else {
      scanLinePosition.value = 0;
      pulseScale.value = 1;
    }
  }, [isScanning]);

  const scanLineAnimatedStyle = useAnimatedStyle(() => {
    return {
      top: `${scanLinePosition.value * 85}%`,
    };
  });

  const pulseAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: pulseScale.value }],
    };
  });

  return (
    <View style={StyleSheet.absoluteFill}>
      {/* Background overlay */}
      <View className="flex-1 bg-black bg-opacity-60" />

      {/* Scanning area */}
      <View className="flex-row">
        <View className="flex-1 bg-black bg-opacity-60" />
        <View className="w-72 h-72 relative">
          {/* Corner brackets with pulse animation */}
          <Animated.View style={[pulseAnimatedStyle]}>
            {/* Top Left Corner */}
            <View className="absolute top-0 left-0 w-12 h-12">
              <View className="w-12 h-1 bg-white absolute top-0" />
              <View className="w-1 h-12 bg-white absolute left-0" />
            </View>

            {/* Top Right Corner */}
            <View className="absolute top-0 right-0 w-12 h-12">
              <View className="w-12 h-1 bg-white absolute top-0" />
              <View className="w-1 h-12 bg-white absolute right-0" />
            </View>

            {/* Bottom Left Corner */}
            <View className="absolute bottom-0 left-0 w-12 h-12">
              <View className="w-12 h-1 bg-white absolute bottom-0" />
              <View className="w-1 h-12 bg-white absolute left-0" />
            </View>

            {/* Bottom Right Corner */}
            <View className="absolute bottom-0 right-0 w-12 h-12">
              <View className="w-12 h-1 bg-white absolute bottom-0" />
              <View className="w-1 h-12 bg-white absolute right-0" />
            </View>
          </Animated.View>

          {/* Scanning line */}
          {isScanning && (
            <Animated.View
              style={[
                scanLineAnimatedStyle,
                {
                  position: 'absolute',
                  left: 12,
                  right: 12,
                  height: 3,
                  backgroundColor: ColorPalette.green.accent,
                  borderRadius: 2,
                  shadowColor: ColorPalette.green.accent,
                  shadowOffset: { width: 0, height: 0 },
                  shadowOpacity: 1,
                  shadowRadius: 8,
                  elevation: 8,
                },
              ]}
            />
          )}
        </View>
        <View className="flex-1 bg-black bg-opacity-60" />
      </View>

      {/* Bottom overlay */}
      <View className="flex-1 bg-black bg-opacity-60" />
    </View>
  );
};

export default ScanningOverlay;
