import { IProvider, useWalletConnectModal } from '@walletconnect/modal-react-native';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { mainnet, sepolia } from 'viem/chains';
import { ScrollView, View } from 'react-native';
import { Address, Chain } from 'viem';

import GradientSeparator from '@/components/icons/GradientSeparator';
import HomeIcon from '@/components/icons/HomeIcon';
import SuccessIcon from '@/components/icons/SuccessIcon';
import ThemeButton from '@/components/ThemedButton';
import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';
import { truncateAddress } from '@/utils/textUtils';

const CHAINS = [mainnet, sepolia];

export default function SuccessUser() {
    const router = useRouter();
    const {
        isConnected,
        provider,
        address: wcAddress,
    } = useWalletConnectModal();
    const address = wcAddress as Address | undefined;
    const [chain, setChain] = useState<Chain>(CHAINS[0]);;
    const [walletName, setWalletName] = useState<string>('Unknown Wallet')

    const disconnectWallet = async () => {
        if (isConnected) {
            await provider?.disconnect();
            router.replace('/(auth)/login');
        }
    }

    useEffect(() => {
        const onChainChangedEvent = (chainId: string) => {
            const chain = CHAINS.find(chain => chain.id === Number(chainId)) ?? CHAINS[0];
            setChain(chain);
        };

        const onConnectEvent = async ({ session }: { session: IProvider['session'] }) => {
            console.log("babikkkk" + session?.peer);

            const name = session?.peer.metadata.name || 'Unknown Wallet';
            setWalletName(name);

            // Need to do some massaging to get the actual chainId from the connect event
            const chainId = session?.namespaces.eip155.chains?.[0].replace('eip155:', '');
            if (chainId) {
                onChainChangedEvent(chainId);
            }
        };

        // Exported types for the `connect` event seem to be wrong, so we need to ignore here
        // @ts-ignore
        provider?.on('connect', onConnectEvent);
        provider?.on('chainChanged', onChainChangedEvent);

        return () => {
            provider?.removeListener('chainChanged', onChainChangedEvent);
            provider?.removeListener('connect', onConnectEvent);
        };
    }, [address, provider]);

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
                    This request will not trigger a blockchain transaction or cost any gas fees.
                </ThemedText>

                <View className="bg-black border-gray-700 border-[0.5px] p-4 mb-6">
                    <DetailRow label="Wallet" value={walletName} />
                    <DetailRow label="Address" value={truncateAddress(address || '')} />
                    <DetailRow label="Network" value={chain.name} />
                    <DetailRow label="Session" value="Secured" />
                </View>

                <View className="flex flex-row items-end gap-2 mt-4">
                    <ThemeButton
                        variant="primary"
                        onPress={() => { disconnectWallet() }}
                        text="Go to Dashboard"
                        LeftIcon={HomeIcon}
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