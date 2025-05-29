import React, { useEffect, useCallback, useRef } from 'react';

import { ScrollView, View, Alert } from 'react-native';

import { useWalletConnectModal } from '@walletconnect/modal-react-native';
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
import useAuthStore from '@/store/authStore';
import useWalletStore from '@/store/walletStore';
import { truncateAddress } from '@/utils/textUtils';

const CHAINS = [mainnet, sepolia];

export default function SuccessUser() {
    const router = useRouter();
    const { isConnected, provider, address: wcAddress } = useWalletConnectModal();
    const address = wcAddress as Address | undefined;

    // Navigation state
    const isNavigatingRef = useRef(false);

    // Get data from Zustand stores
    const {
        walletName,
        truncatedAddress,
        chainName,
        balance,
        setWalletData,
        updateBalance,
        updateChain,
        disconnect: disconnectWallet,
    } = useWalletStore();

    // Auth store
    const { setRole, clearRole } = useAuthStore();

    // Reset navigation flags when screen comes into focus
    useFocusEffect(
        useCallback(() => {
            isNavigatingRef.current = false;
            return () => {
                isNavigatingRef.current = false;
            };
        }, [])
    );

    // Handle going to dashboard
    const goToDashboard = useCallback(async () => {
        if (isNavigatingRef.current) return;

        try {
            isNavigatingRef.current = true;
            setRole('merchant');
            router.replace('/(tabs)');
        } catch (error) {
            console.error('Error going to dashboard:', error);
            Alert.alert('Error', 'Failed to access dashboard. Please try again.');
            isNavigatingRef.current = false;
        }
    }, [setRole, router]);

    // Handle chain change
    const handleChainChange = useCallback(
        async (chainId: string) => {
            try {
                const newChain =
                    CHAINS.find((chain) => chain.id === Number(chainId)) ?? CHAINS[0];
                updateChain(newChain);

                if (address) {
                    try {
                        const newBalance = await publicClient.getBalance({ address });
                        updateBalance(formatEther(newBalance));
                    } catch (balanceError) {
                        updateBalance('0');
                    }
                }
            } catch (error) {
                console.error('Error handling chain change:', error);
            }
        },
        [address, updateChain, updateBalance]
    );

    // Handle wallet connection
    const handleConnect = useCallback(
        async ({ session }: { session: any }) => {
            try {
                if (!session) return;

                const name = session.peer?.metadata?.name || 'Unknown Wallet';
                const chainId = session.namespaces?.eip155?.chains?.[0]?.replace(
                    'eip155:',
                    ''
                );
                const currentChain = chainId
                    ? (CHAINS.find((chain) => chain.id === Number(chainId)) ?? CHAINS[0])
                    : CHAINS[0];

                const sessionAccounts = session.namespaces?.eip155?.accounts || [];
                const sessionAddress = sessionAccounts[0]?.split(':')[2] || address;

                if (!sessionAddress) return;

                let formattedBalance = '0';
                try {
                    const balanceResult = await publicClient.getBalance({
                        address: sessionAddress as Address,
                    });
                    formattedBalance = formatEther(balanceResult);
                } catch (balanceError) {
                    // Keep default balance of '0'
                }

                setWalletData({
                    walletName: name,
                    address: sessionAddress,
                    truncatedAddress: truncateAddress(sessionAddress),
                    chainName: currentChain.name,
                    balance: formattedBalance,
                    chain: currentChain,
                    provider,
                });
            } catch (error) {
                console.error('Error in connect event handler:', error);
            }
        },
        [address, provider, setWalletData]
    );

    // Monitor connection status and redirect if disconnected
    useEffect(() => {
        if (!isConnected && !isNavigatingRef.current) {
            isNavigatingRef.current = true;
            disconnectWallet();
            clearRole();
            router.replace('/(auth)/login');
        }
    }, [isConnected, disconnectWallet, clearRole, router]);

    // Set up event listeners
    useEffect(() => {
        if (!provider) return;

        // Initialize if already connected
        if (isConnected && provider.session) {
            handleConnect({ session: provider.session });
        }

        const setupEventListeners = () => {
            try {
                // @ts-ignore - WalletConnect types issue
                provider.on('connect', handleConnect);
                provider.on('chainChanged', handleChainChange);

                // Handle disconnections
                const handleDisconnect = () => {
                    if (!isNavigatingRef.current) {
                        disconnectWallet();
                        clearRole();
                        isNavigatingRef.current = true;
                        router.replace('/(auth)/login');
                    }
                };

                (provider as any).on('session_delete', handleDisconnect);
                provider.on('disconnect', handleDisconnect);
            } catch (error) {
                console.error('Error setting up event listeners:', error);
            }
        };

        setupEventListeners();

        // Cleanup
        return () => {
            try {
                provider.removeListener('connect', handleConnect);
                provider.removeListener('chainChanged', handleChainChange);
                provider.removeListener('session_delete', () => { });
                provider.removeListener('disconnect', () => { });
            } catch (error) {
                console.error('Error cleaning up event listeners:', error);
            }
        };
    }, [
        provider,
        isConnected,
        handleConnect,
        handleChainChange,
        disconnectWallet,
        clearRole,
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

                <View className="flex flex-col gap-3 mt-4">
                    <ThemeButton
                        variant="primary"
                        onPress={goToDashboard}
                        text={isNavigatingRef.current ? 'Loading...' : 'Go to Dashboard'}
                        LeftIcon={HomeIcon}
                        disabled={isNavigatingRef.current}
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
