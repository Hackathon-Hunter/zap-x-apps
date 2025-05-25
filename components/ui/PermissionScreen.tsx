import React from 'react';

import { View, Pressable } from 'react-native';

import QRIcon from '@/components/icons/QRIcon';
import { ThemedText } from '@/components/ThemedText';
import { Colors, ColorPalette } from '@/constants/Colors';

interface PermissionScreenProps {
  hasPermission: boolean | null;
  onRequestPermission: () => void;
}

const PermissionScreen: React.FC<PermissionScreenProps> = ({
  hasPermission,
  onRequestPermission,
}) => {
  if (hasPermission === null) {
    return (
      <View className="flex-1 justify-center items-center bg-black px-6">
        <QRIcon color={ColorPalette.gray[400]} width={64} height={64} />
        <ThemedText
          color={Colors.dark.text.primary}
          className="mt-4 text-center"
        >
          Requesting camera permission...
        </ThemedText>
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View className="flex-1 justify-center items-center bg-black px-6">
        <View className="items-center">
          <QRIcon color={ColorPalette.red} width={64} height={64} />

          <ThemedText
            color={Colors.dark.text.primary}
            className="text-xl font-medium mt-6 text-center"
          >
            Camera Access Required
          </ThemedText>

          <ThemedText
            color={Colors.dark.text.secondary}
            className="text-center mt-4 max-w-80 leading-6"
          >
            To scan QR codes for payments, ZapX needs access to your camera.
            This allows you to quickly scan merchant payment codes.
          </ThemedText>

          <Pressable
            onPress={onRequestPermission}
            className="bg-green-500 px-8 py-4 rounded-xl mt-8"
          >
            <ThemedText
              color={Colors.dark.text.primary}
              className="font-medium text-base"
            >
              Grant Camera Permission
            </ThemedText>
          </Pressable>

          <ThemedText
            color={Colors.dark.text.secondary}
            className="text-center mt-6 text-sm max-w-72"
          >
            You can also upload QR codes from your gallery without camera access
          </ThemedText>
        </View>
      </View>
    );
  }

  return null;
};

export default PermissionScreen;
