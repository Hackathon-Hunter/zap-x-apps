import React, { useState, useCallback } from 'react';

import { View, Text, ScrollView, Alert } from 'react-native';

import { useWalletConnectModal } from '@walletconnect/modal-react-native';
import { useRouter } from 'expo-router';

import CopyIcon from '@/components/icons/CopyIcon';
import DisconnectIcon from '@/components/icons/DisconnectIcon';
import GradientSeparator from '@/components/icons/GradientSeparator';
import HelpIcon from '@/components/icons/HelpIcon';
import LanguageIcon from '@/components/icons/LanguageIcon';
import NetworkIcon from '@/components/icons/NetworkIcon';
import NotificationIcon from '@/components/icons/NotificationIcon';
import SecurityIcon from '@/components/icons/SecurityIcon';
import WalletIcon from '@/components/icons/WalletIcon';
import ZapIcon from '@/components/icons/ZapIcon';
import ThemeButton from '@/components/ThemedButton';
import ThemeInputField from '@/components/ThemedInputField';
import { ThemedText } from '@/components/ThemedText';
import SettingCardProfile from '@/components/ui/SettingCardProfile';
import { Colors } from '@/constants/Colors';
import useAuthStore from '@/store/authStore';
import useWalletStore from '@/store/walletStore';

// Dummy data
const DUMMY_TRANSACTIONS = [
  {
    type: 'Wallet Management',
    date: 'Import, export, and backup wallet',
    icon: WalletIcon,
  },
  {
    type: 'Network Settings',
    date: 'Manage blockchain networks',
    icon: NetworkIcon,
  },
  {
    type: 'Security',
    date: 'Password, 2FA, and biometrics',
    icon: SecurityIcon,
  },
  {
    type: 'Notifications',
    date: 'Push notifications, transactions alerts and updates',
    icon: NotificationIcon,
  },
  {
    type: 'Language & Region',
    date: 'English, Currency: IDR',
    icon: LanguageIcon,
  },
  {
    type: 'Help & Support',
    date: 'FAQ, contact support',
    icon: HelpIcon,
  },
];

const UserProfile = () => {
  const router = useRouter();
  const { provider, isConnected } = useWalletConnectModal();

  // Zustand stores
  const {
    disconnect: disconnectWallet,
    truncatedAddress,
    provider: walletProvider,
  } = useWalletStore();
  const { clearRole } = useAuthStore();

  // State for disconnect process
  const [isDisconnecting, setIsDisconnecting] = useState(false);

  // Use truncated address from wallet store, fallback to dummy data
  const [inputValue, setInputValue] = useState(
    truncatedAddress || '0xA13...8F9c'
  );

  // Update input value when truncated address changes
  React.useEffect(() => {
    if (truncatedAddress) {
      setInputValue(truncatedAddress);
    }
  }, [truncatedAddress]);

  // Handle disconnect wallet
  const handleDisconnectWallet = useCallback(async () => {
    if (isDisconnecting) return;

    try {
      setIsDisconnecting(true);

      // Show confirmation dialog
      Alert.alert(
        'Disconnect Wallet',
        'Are you sure you want to disconnect your wallet? You will be redirected to the login screen.',
        [
          {
            text: 'Cancel',
            style: 'cancel',
            onPress: () => setIsDisconnecting(false),
          },
          {
            text: 'Disconnect',
            style: 'destructive',
            onPress: async () => {
              try {
                // Disconnect from WalletConnect if connected
                if (provider && isConnected) {
                  await provider.disconnect();

                  // Clear any residual session data
                  if (provider.session) {
                    try {
                      await provider.client?.core?.pairing?.disconnect({
                        topic: provider.session.topic,
                      });
                    } catch (error) {
                      console.log('Error disconnecting pairing:', error);
                    }
                  }
                }

                // Alternative: try using walletProvider from store if main provider doesn't work
                if (walletProvider && walletProvider !== provider) {
                  try {
                    await walletProvider.disconnect();
                  } catch (error) {
                    console.log('Error disconnecting wallet provider:', error);
                  }
                }

                // Clear Zustand stores
                disconnectWallet(); // Clear wallet store
                clearRole(); // Clear role from auth store

                console.log('Wallet disconnected successfully');

                // Navigate to login screen
                router.replace('/(auth)/login');
              } catch (error) {
                console.error('Error during disconnect:', error);

                // Still clear stores and navigate even if WalletConnect disconnect fails
                disconnectWallet();
                clearRole();
                router.replace('/(auth)/login');
              } finally {
                setIsDisconnecting(false);
              }
            },
          },
        ]
      );
    } catch (error) {
      console.error('Error showing disconnect dialog:', error);
      setIsDisconnecting(false);
    }
  }, [
    isDisconnecting,
    provider,
    isConnected,
    walletProvider,
    disconnectWallet,
    clearRole,
    router,
  ]);

  return (
    <ScrollView>
      <View className="flex flex-col gap-2">
        <View className="flex flex-col gap-2">
          <ThemedText color={Colors.dark.text.muted} type="subtitle">
            Wallet
          </ThemedText>
          <ThemeInputField
            placeholder="wallet"
            inputValue={inputValue}
            onChangeText={setInputValue}
            LeftIcon={CopyIcon}
            textButton="Copy"
            rightButton={true}
            readOnly
          />
        </View>

        <ThemeButton
          text={isDisconnecting ? 'Disconnecting...' : 'Disconnect Wallet'}
          onPress={handleDisconnectWallet}
          variant="secondary"
          LeftIcon={DisconnectIcon}
          disabled={isDisconnecting}
        />

        <GradientSeparator />

        <View className="flex gap-3 mt-4">
          {DUMMY_TRANSACTIONS.map((item, i) => (
            <SettingCardProfile
              key={i}
              type={item.type}
              date={item.date}
              LeftIcon={item.icon}
            />
          ))}
        </View>

        <View className="flex flex-col gap-2 justify-center items-center mt-4">
          <ZapIcon />
          <ThemedText color={Colors.dark.text.muted} type="subtitle">
            ZapX v1.0.0
          </ThemedText>
        </View>
      </View>
    </ScrollView>
  );
};

export default UserProfile;
