import React, { useEffect, useCallback, useRef } from 'react';

import { ScrollView, View, Alert } from 'react-native';

import {
  IProvider,
  useWalletConnectModal,
} from '@walletconnect/modal-react-native';
import { useRouter, useFocusEffect } from 'expo-router';
import { Address, formatEther } from 'viem';
import { mainnet, sepolia } from 'viem/chains';

import GradientSeparator from '@/components/icons/GradientSeparator';
import HomeIcon from '@/components/icons/HomeIcon';
import SuccessIcon from '@/components/icons/SuccessIcon';
import ThemeButton from '@/components/ThemedButton';
import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';
import { publicClient } from '@/constants/ConnectWallet';
import useWalletStore from '@/store/walletStore';
import { truncateAddress } from '@/utils/textUtils';

const CHAINS = [mainnet, sepolia];

export default function SuccessUser() {
  const router = useRouter();
  const { isConnected, provider, address: wcAddress } = useWalletConnectModal();
  const address = wcAddress as Address | undefined;

  // Refs to prevent multiple navigations
  const isNavigatingRef = useRef(false);
  const isDisconnectingRef = useRef(false);

  // Get data from Zustand store
  const {
    walletName,
    truncatedAddress,
    chainName,
    balance,
    setWalletData,
    updateBalance,
    updateChain,
    disconnect,
  } = useWalletStore();

  // Reset navigation flags when screen comes into focus
  useFocusEffect(
    useCallback(() => {
      isNavigatingRef.current = false;
      isDisconnectingRef.current = false;

      return () => {
        isNavigatingRef.current = false;
        isDisconnectingRef.current = false;
      };
    }, [])
  );

  const navigateToHomePage = () => {
    router.replace('/(tabs)');
  };

  // Handle disconnect with proper cleanup
  const disconnectWallet = useCallback(async () => {
    if (isDisconnectingRef.current || isNavigatingRef.current) {
      return; // Prevent multiple disconnections
    }

    try {
      isDisconnectingRef.current = true;

      if (provider && isConnected) {
        // Disconnect from WalletConnect
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

      // Clear Zustand store
      disconnect();

      // Navigate back to login with replace to prevent back navigation
      if (!isNavigatingRef.current) {
        isNavigatingRef.current = true;
        router.replace('/(auth)/login');
      }
    } catch (error) {
      console.error('Error during disconnect:', error);

      // Still clear store and navigate even if disconnect fails
      disconnect();

      if (!isNavigatingRef.current) {
        isNavigatingRef.current = true;
        router.replace('/(auth)/login');
      }
    } finally {
      // Reset flags after a delay
      setTimeout(() => {
        isDisconnectingRef.current = false;
        isNavigatingRef.current = false;
      }, 1000);
    }
  }, [provider, isConnected, disconnect, router]);

  // Handle chain change
  const handleChainChange = useCallback(
    async (chainId: string) => {
      try {
        const newChain =
          CHAINS.find((chain) => chain.id === Number(chainId)) ?? CHAINS[0];
        updateChain(newChain);

        // Update balance for new chain if address exists
        if (address) {
          try {
            const newBalance = await publicClient.getBalance({ address });
            updateBalance(formatEther(newBalance));
          } catch (balanceError) {
            console.error(
              'Error fetching balance for new chain:',
              balanceError
            );
            updateBalance('0');
          }
        }
      } catch (error) {
        console.error('Error handling chain change:', error);
      }
    },
    [address, updateChain, updateBalance]
  );

  // Handle connect event
  const handleConnect = useCallback(
    async ({ session }: { session: IProvider['session'] }) => {
      try {
        console.log('Connect event triggered, session:', session?.topic);

        if (!session) {
          console.warn('No session data in connect event');
          return;
        }

        const name = session.peer?.metadata?.name || 'Unknown Wallet';

        // Get chain info from session
        const chainId = session.namespaces?.eip155?.chains?.[0]?.replace(
          'eip155:',
          ''
        );
        const currentChain = chainId
          ? (CHAINS.find((chain) => chain.id === Number(chainId)) ?? CHAINS[0])
          : CHAINS[0];

        // Get address from session accounts
        const sessionAccounts = session.namespaces?.eip155?.accounts || [];
        const sessionAddress = sessionAccounts[0]?.split(':')[2] || address;

        if (!sessionAddress) {
          console.warn('No address found in session or WalletConnect modal');
          return;
        }

        let formattedBalance = '0';
        try {
          const balanceResult = await publicClient.getBalance({
            address: sessionAddress as Address,
          });
          formattedBalance = formatEther(balanceResult);
        } catch (balanceError) {
          console.error('Error fetching balance:', balanceError);
        }

        // Store all data in Zustand
        setWalletData({
          walletName: name,
          address: sessionAddress,
          truncatedAddress: truncateAddress(sessionAddress),
          chainName: currentChain.name,
          balance: formattedBalance,
          chain: currentChain,
          provider,
        });

        console.log('Wallet data updated successfully');
      } catch (error) {
        console.error('Error in connect event handler:', error);
      }
    },
    [address, provider, setWalletData]
  );

  // Monitor connection status and redirect if disconnected
  useEffect(() => {
    if (
      !isConnected &&
      !isDisconnectingRef.current &&
      !isNavigatingRef.current
    ) {
      // If not connected and we're not in the process of disconnecting
      // redirect to login (wallet was disconnected externally)
      console.log('Wallet disconnected externally, redirecting to login');
      isNavigatingRef.current = true;
      disconnect(); // Clear store
      router.replace('/(auth)/login');
    }
  }, [isConnected, disconnect, router]);

  // Set up event listeners
  useEffect(() => {
    if (!provider) {
      console.log('No provider available');
      return;
    }

    // Check if already connected and session exists
    if (isConnected && provider.session) {
      console.log('Already connected, initializing wallet data');
      handleConnect({ session: provider.session });
    }

    // Set up event listeners with error handling
    const setupEventListeners = () => {
      try {
        // @ts-ignore - WalletConnect types issue
        provider.on('connect', handleConnect);
        provider.on('chainChanged', handleChainChange);

        // Add session_delete listener to handle disconnections
        (provider as any).on('session_delete', () => {
          console.log('Session deleted, clearing wallet data');
          if (!isDisconnectingRef.current && !isNavigatingRef.current) {
            disconnect();
            isNavigatingRef.current = true;
            router.replace('/(auth)/login');
          }
        });

        // Add disconnect listener
        provider.on('disconnect', () => {
          console.log('Provider disconnected, clearing wallet data');
          if (!isDisconnectingRef.current && !isNavigatingRef.current) {
            disconnect();
            isNavigatingRef.current = true;
            router.replace('/(auth)/login');
          }
        });

        console.log('Event listeners set up successfully');
      } catch (error) {
        console.error('Error setting up event listeners:', error);
      }
    };

    setupEventListeners();

    // Cleanup function
    return () => {
      try {
        provider.removeListener('connect', handleConnect);
        provider.removeListener('chainChanged', handleChainChange);
        provider.removeListener('session_delete', disconnect);
        provider.removeListener('disconnect', disconnect);
        console.log('Event listeners cleaned up');
      } catch (error) {
        console.error('Error cleaning up event listeners:', error);
      }
    };
  }, [
    provider,
    isConnected,
    handleConnect,
    handleChainChange,
    disconnect,
    router,
  ]);

  return (
    <ScrollView className="flex-1 bg-black">
      <View className="flex-1 px-4 mt-16">
        <View className="items-center mb-2">
          <SuccessIcon />
        </View>
        <ThemedText
          color={Colors.dark.text.primary}
          className="text-xl font-bold text-center mb-2"
        >
          Wallet Connected
        </ThemedText>
        <ThemedText
          color={Colors.dark.text.secondary}
          className="text-l font-normal text-center mb-8 px-4"
        >
          This request will not trigger a blockchain transaction or cost any gas
        </ThemedText>

        <View className="bg-black border-gray-700 border-[0.5px] p-4 mb-6">
          <DetailRow label="Wallet" value={walletName || 'Loading...'} />
          <DetailRow label="Address" value={truncatedAddress || 'Loading...'} />
          <DetailRow label="Network" value={chainName || 'Loading...'} />
          <DetailRow label="Balance" value={balance || '0'} />
          <DetailRow label="Session" value="Secured" />
        </View>

        <View className="flex flex-row items-end gap-2 mt-4">
          <ThemeButton
            variant="primary"
            onPress={disconnectWallet}
            text={
              isDisconnectingRef.current
                ? 'Disconnecting...'
                : 'Go to Dashboard'
            }
            LeftIcon={HomeIcon}
            disabled={isDisconnectingRef.current}
          />
          <ThemeButton
            variant="primary"
            onPress={navigateToHomePage}
            text={'Go to Dashboard Asli Iki'}
            LeftIcon={HomeIcon}
            disabled={isDisconnectingRef.current}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const DetailRow = ({
  label,
  value,
  isTotal = false,
  prefix,
}: {
  label: string;
  value: string;
  valueColor?: string;
  isTotal?: boolean;
  prefix?: string;
}) => (
  <View>
    {isTotal && (
      <View className="py-5">
        <GradientSeparator />
      </View>
    )}
    <View className="flex-row justify-between items-center py-2">
      <ThemedText
        color={Colors.dark.text.secondary}
        className="text-sm font-medium"
      >
        {label}
      </ThemedText>
      <View className="flex flex-row gap-2">
        <ThemedText
          color={Colors.dark.text.secondary}
          className="text-sm font-medium"
          numbersOnly
        >
          {prefix}
        </ThemedText>
        <ThemedText
          color={Colors.dark.text.primary}
          className="text-sm font-medium"
          numbersOnly
        >
          {value}
        </ThemedText>
      </View>
    </View>
  </View>
);
