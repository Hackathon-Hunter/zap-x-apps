import React, { useEffect } from 'react';

import { View, StyleSheet } from 'react-native';

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withSequence,
  interpolate,
  Easing,
} from 'react-native-reanimated';

import { ColorPalette } from '@/constants/Colors';

interface ScanningOverlayProps {
  isScanning: boolean;
}

const ScanningOverlay: React.FC<ScanningOverlayProps> = ({ isScanning }) => {
  const scanLinePosition = useSharedValue(0);
  const cornerGlow = useSharedValue(0);
  const scanLineOpacity = useSharedValue(0);

  useEffect(() => {
    if (isScanning) {
      // Smooth scanning line animation like Shopee/GoPay
      scanLinePosition.value = withRepeat(
        withSequence(
          withTiming(1, {
            duration: 2500,
            easing: Easing.inOut(Easing.quad),
          }),
          withTiming(0, { duration: 0 })
        ),
        -1,
        false
      );

      // Corner glow animation
      cornerGlow.value = withRepeat(
        withSequence(
          withTiming(1, { duration: 1500 }),
          withTiming(0.3, { duration: 1500 })
        ),
        -1,
        true
      );

      // Scan line opacity animation
      scanLineOpacity.value = withRepeat(
        withSequence(
          withTiming(1, { duration: 1000 }),
          withTiming(0.6, { duration: 1000 })
        ),
        -1,
        true
      );
    } else {
      scanLinePosition.value = 0;
      cornerGlow.value = 0.3;
      scanLineOpacity.value = 0;
    }
  }, [isScanning]);

  const scanLineAnimatedStyle = useAnimatedStyle(() => {
    const progress = scanLinePosition.value;
    return {
      top: `${progress * 82}%`,
      opacity:
        interpolate(progress, [0, 0.1, 0.5, 0.9, 1], [0, 0.8, 1, 0.8, 0]) *
        scanLineOpacity.value,
    };
  });

  const cornerGlowStyle = useAnimatedStyle(() => {
    return {
      opacity: cornerGlow.value,
    };
  });

  const renderCorner = (position: 'tl' | 'tr' | 'bl' | 'br') => {
    const positionClasses = {
      tl: 'top-0 left-0',
      tr: 'top-0 right-0',
      bl: 'bottom-0 left-0',
      br: 'bottom-0 right-0',
    };

    return (
      <View className={`absolute ${positionClasses[position]} w-8 h-8`}>
        {/* Main corner brackets */}
        <View className="absolute inset-0">
          {/* Horizontal line */}
          <View
            className={`absolute w-8 h-1 bg-white rounded-full ${
              position.includes('t') ? 'top-0' : 'bottom-0'
            } ${position.includes('l') ? 'left-0' : 'right-0'}`}
          />
          {/* Vertical line */}
          <View
            className={`absolute w-1 h-8 bg-white rounded-full ${
              position.includes('t') ? 'top-0' : 'bottom-0'
            } ${position.includes('l') ? 'left-0' : 'right-0'}`}
          />
        </View>

        {/* Glow effect */}
        <Animated.View style={[cornerGlowStyle]} className="absolute inset-0">
          <View
            className={`absolute w-8 h-1 rounded-full ${
              position.includes('t') ? 'top-0' : 'bottom-0'
            } ${position.includes('l') ? 'left-0' : 'right-0'}`}
            style={{
              backgroundColor: ColorPalette.green.accent,
              shadowColor: ColorPalette.green.accent,
              shadowOffset: { width: 0, height: 0 },
              shadowOpacity: 0.8,
              shadowRadius: 4,
              elevation: 8,
            }}
          />
          <View
            className={`absolute w-1 h-8 rounded-full ${
              position.includes('t') ? 'top-0' : 'bottom-0'
            } ${position.includes('l') ? 'left-0' : 'right-0'}`}
            style={{
              backgroundColor: ColorPalette.green.accent,
              shadowColor: ColorPalette.green.accent,
              shadowOffset: { width: 0, height: 0 },
              shadowOpacity: 0.8,
              shadowRadius: 4,
              elevation: 8,
            }}
          />
        </Animated.View>
      </View>
    );
  };

  return (
    <View style={StyleSheet.absoluteFill}>
      {/* Background overlay */}
      <View className="flex-1 bg-black/70" />

      {/* Scanning area */}
      <View className="flex-row">
        <View className="flex-1 bg-black/70" />

        <View className="w-80 h-80 relative">
          {/* Corner brackets */}
          {renderCorner('tl')}
          {renderCorner('tr')}
          {renderCorner('bl')}
          {renderCorner('br')}

          {/* Scanning line - Shopee/GoPay style */}
          {isScanning && (
            <Animated.View
              style={[
                scanLineAnimatedStyle,
                {
                  position: 'absolute',
                  left: 8,
                  right: 8,
                  height: 2,
                  borderRadius: 1,
                },
              ]}
            >
              {/* Main scan line */}
              <View
                className="flex-1 rounded-full"
                style={{
                  backgroundColor: ColorPalette.green.accent,
                }}
              />

              {/* Glow effect for scan line */}
              <View
                className="absolute inset-0 rounded-full"
                style={{
                  backgroundColor: ColorPalette.green.accent,
                  shadowColor: ColorPalette.green.accent,
                  shadowOffset: { width: 0, height: 0 },
                  shadowOpacity: 1,
                  shadowRadius: 8,
                  elevation: 10,
                }}
              />

              {/* Leading edge glow */}
              <View
                className="absolute -top-1 -bottom-1 right-0 w-4 rounded-full"
                style={{
                  backgroundColor: ColorPalette.green.accent,
                  opacity: 0.6,
                  shadowColor: ColorPalette.green.accent,
                  shadowOffset: { width: 2, height: 0 },
                  shadowOpacity: 0.8,
                  shadowRadius: 6,
                }}
              />
            </Animated.View>
          )}

          {/* Subtle frame border when scanning */}
          {isScanning && (
            <View
              className="absolute inset-4 border rounded-2xl"
              style={{
                borderColor: ColorPalette.green.accent + '20',
                borderWidth: 1,
              }}
            />
          )}
        </View>

        <View className="flex-1 bg-black/70" />
      </View>

      {/* Bottom overlay */}
      <View className="flex-1 bg-black/70" />
    </View>
  );
};

export default ScanningOverlay;
