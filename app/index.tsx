import { useState, useEffect } from 'react';

import { View } from 'react-native';

import { Redirect } from 'expo-router';

import ZapIcon from '@/components/icons/ZapIcon';
import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';
import useAuthStore from '@/store/authStore';

export default function Index() {
    const [isReady, setIsReady] = useState(false);
    const [isCheckingAuth, setIsCheckingAuth] = useState(true);
    const { role, initializeRole } = useAuthStore();

    useEffect(() => {
        const prepareApp = async () => {
            try {
                await initializeRole();

                await new Promise((resolve) => setTimeout(resolve, 500));

                setIsCheckingAuth(false);
                setIsReady(true);
            } catch (error) {
                console.error('Error preparing app:', error);
                setIsCheckingAuth(false);
                setIsReady(true);
            }
        };

        prepareApp();
    }, [initializeRole]);

    if (isCheckingAuth || !isReady) {
        return (
            <View className="flex-1 justify-center items-center bg-black">
                <ZapIcon width={40} height={40} fillColor={Colors.dark.text.primary} />
                <ThemedText
                    color={Colors.dark.text.primary}
                    className="text-xl font-medium mt-4"
                >
                    Loading...
                </ThemedText>
            </View>
        );
    }

    if (role) {
        return <Redirect href="/(tabs)" />;
    } else {
        return <Redirect href="/(auth)/login" />;
    }
}
