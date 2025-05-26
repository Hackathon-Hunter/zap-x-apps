import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';
import { useWalletConnectModal } from '@walletconnect/modal-react-native';
import { useRouter } from 'expo-router';
import React from 'react';

import { Button, View } from 'react-native';

export default function SuccessUser() {
    const router = useRouter();
    const {
        isConnected,
        provider,
    } = useWalletConnectModal();

    const disconnectWallet = async () => {
        if (isConnected) {
            await provider?.disconnect();
            router.replace('/(auth)/login');
        }
    }
    return (
        <View>
            <ThemedText
                color={Colors.dark.text.primary}
                className="text-4xl font-medium mt-2"
            >
                ZapX
            </ThemedText>
            <Button title="Disconnect Wallet" onPress={() => { disconnectWallet() }} />
        </View>
    );
}
