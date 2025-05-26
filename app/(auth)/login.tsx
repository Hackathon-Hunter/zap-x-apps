import { Image, View } from 'react-native';

import {
  useWalletConnectModal,
  WalletConnectModal,
} from '@walletconnect/modal-react-native';
import { useRouter } from 'expo-router';
import { Address } from 'viem';

import GradientSeparator from '@/components/icons/GradientSeparator';
import MerchantIcon from '@/components/icons/MerchantIcon';
import UserIcon from '@/components/icons/UserIcon';
import ZapIcon from '@/components/icons/ZapIcon';
import ThemeButton from '@/components/ThemedButton';
import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';
import { projectId, providerMetadata } from '@/constants/ConnectWallet';

import { styles } from './style';

import './../../polyfills';
import { useEffect } from 'react';

export default function LoginScreen() {
  const router = useRouter();
  const {
    open,
    isConnected,
    provider,
  } = useWalletConnectModal();

  useEffect(() => {
    if (isConnected) {
      router.push('/(auth)/successUser');
    }
  }, [isConnected, router]);

  const handleLoginUser = () => {
    if (isConnected) {
      provider?.disconnect();
    } else {
      open();
    }
  };

  return (
    <View className="flex-1 justify-center bg-black">
      <Image
        source={require('@/assets/images/bg-image.png')}
        style={styles.imageBackground}
        resizeMode="cover"
      />
      <View style={styles.overlayBackground} />
      {/* Logo Section - Tightly Spaced */}
      <View className="items-center mb-6 px-4">
        <ZapIcon width={40} height={40} fillColor={Colors.dark.text.primary} />
        <ThemedText
          color={Colors.dark.text.primary}
          className="text-4xl font-medium mt-2"
        >
          ZapX
        </ThemedText>
        <ThemedText
          color={Colors.dark.text.primary}
          className="text-base font-medium mt-1 text-center"
        >
          Lorem ipsum sit dolor amet.
        </ThemedText>
      </View>

      {/* Login Buttons - Compact */}
      <View className="w-full px-4">
        <View className="flex flex-row items-end gap-2 mt-4">
          <ThemeButton
            variant="primary"
            onPress={() => handleLoginUser()}
            text="Continue as User"
            LeftIcon={UserIcon}
          />
        </View>

        {/* OR Separator - Compact */}
        <View className="flex-row justify-center items-center py-4 bg-black">
          <View className="flex-1 max-w-[100px] mx-2">
            <GradientSeparator />
          </View>
          <ThemedText color={Colors.dark.text.primary}> OR </ThemedText>
          <View className="flex-1 max-w-[100px] mx-2">
            <GradientSeparator />
          </View>
        </View>

        <View className="flex flex-row items-end gap-2 mt-4">
          <ThemeButton
            variant="primary"
            onPress={() => { }}
            text="Continue as Merchant"
            LeftIcon={MerchantIcon}
          />
        </View>
        <WalletConnectModal
          projectId={projectId ?? 'defaultProjectId'}
          providerMetadata={providerMetadata}
        />
      </View>
    </View>
  );
}
