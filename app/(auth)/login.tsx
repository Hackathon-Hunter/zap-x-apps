// Import polyfills FIRST, before any other imports
import './../../polyfills';
import { useEffect, useCallback, useRef, useState } from 'react';

import { Image, View, Alert } from 'react-native';

import {
  useWalletConnectModal,
  WalletConnectModal,
} from '@walletconnect/modal-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter, useFocusEffect } from 'expo-router';

import GradientSeparator from '@/components/icons/GradientSeparator';
import MerchantIcon from '@/components/icons/MerchantIcon';
import UserIcon from '@/components/icons/UserIcon';
import ZapIcon from '@/components/icons/ZapIcon';
import ThemeButton from '@/components/ThemedButton';
import { ThemedText } from '@/components/ThemedText';
import RegisterModal from '@/components/ui/RegisterModal';
import { Colors } from '@/constants/Colors';
import { projectId, providerMetadata } from '@/constants/ConnectWallet';
import useAuthStore from '@/store/authStore';
import useWalletStore from '@/store/walletStore';

export default function LoginScreen() {
  const router = useRouter();
  const { open, isConnected, provider } = useWalletConnectModal();
  const [isRegisterModalVisible, setRegisterModalVisible] = useState(false);

  // Auth and Wallet stores
  const { role } = useAuthStore();
  const { isConnected: walletStoreConnected } = useWalletStore();

  // Simple state management
  const [isConnecting, setIsConnecting] = useState(false);
  const [hasNavigated, setHasNavigated] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const timeoutRef = useRef<any>(null);
  const [initialLoadComplete, setInitialLoadComplete] = useState(false);

  // Initialize auth checking with proper delay
  useEffect(() => {
    const initializeAuth = async () => {
      // Wait for stores to properly initialize
      await new Promise((resolve) => setTimeout(resolve, 500));
      setInitialLoadComplete(true);
    };

    initializeAuth();
  }, []);

  // Check if user is already logged in (when app opens)
  useEffect(() => {
    if (!initialLoadComplete) return; // Wait for initial load

    const checkAuthStatus = async () => {
      try {
        // Get fresh values from stores
        const currentRole = useAuthStore.getState().role;
        const currentWalletConnected = useWalletStore.getState().isConnected;

        if (currentRole && (currentWalletConnected || isConnected)) {
          setHasNavigated(true);
          router.replace('/(tabs)');
          return;
        }

        if (currentRole && !currentWalletConnected && !isConnected) {
          const { clearRole } = useAuthStore.getState();
          clearRole();
        }

        setIsCheckingAuth(false);
      } catch (error) {
        setIsCheckingAuth(false);
      }
    };

    checkAuthStatus();
  }, [initialLoadComplete, router]);

  // Separate effect to monitor role changes
  useEffect(() => {
    if (!initialLoadComplete) return;

    // If we have a role and wallet connection and haven't navigated yet
    if (
      role &&
      (walletStoreConnected || isConnected) &&
      !hasNavigated &&
      !isCheckingAuth
    ) {
      setHasNavigated(true);
      router.replace('/(tabs)');
    }
  }, [
    role,
    walletStoreConnected,
    isConnected,
    hasNavigated,
    isCheckingAuth,
    initialLoadComplete,
    router,
  ]);

  // Reset state when screen comes into focus
  useFocusEffect(
    useCallback(() => {
      setIsConnecting(false);
      setHasNavigated(false);

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }

      return () => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
      };
    }, [])
  );

  useEffect(() => {
    if (
      isConnected &&
      !hasNavigated &&
      !isConnecting &&
      !isCheckingAuth &&
      !role
    ) {
      setHasNavigated(true);

      setTimeout(() => {
        router.replace('/(auth)/successUser');
      }, 100);
    }

    // RETURNING USER: Wallet connected and user already has a role
    else if (
      isConnected &&
      !hasNavigated &&
      !isConnecting &&
      !isCheckingAuth &&
      role
    ) {
      setHasNavigated(true);
      router.replace('/(tabs)');
    }
  }, [isConnected, hasNavigated, isConnecting, isCheckingAuth, role, router]);

  // Reset connecting state if it gets stuck
  useEffect(() => {
    if (isConnecting) {
      timeoutRef.current = setTimeout(() => {
        setIsConnecting(false);
      }, 5000); // 5 second timeout

      return () => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
      };
    }
  }, [isConnecting]);

  // Handle wallet connection/disconnection
  const handleLoginUser = useCallback(async () => {
    if (isConnecting) {
      return;
    }

    try {
      if (isConnected && provider) {
        setIsConnecting(true);
        await provider.disconnect();

        // Reset states after disconnect
        setTimeout(() => {
          setIsConnecting(false);
          setHasNavigated(false);
        }, 1000);
      } else {
        setIsConnecting(true);
        setHasNavigated(false);

        try {
          await open();
        } catch (error) {
          console.error('Error opening modal:', error);
          setIsConnecting(false);
          Alert.alert('Error', 'Failed to open wallet connection');
        }
      }
    } catch (error) {
      console.error('Error in handleLoginUser:', error);
      setIsConnecting(false);
    }
  }, [isConnected, provider, open, isConnecting]);

  // Get button text
  const getButtonText = () => {
    if (isCheckingAuth) return 'Loading...';
    if (isConnecting && isConnected) return 'Disconnecting...';
    if (isConnecting && !isConnected) return 'Connecting...';
    if (isConnected) return 'Disconnect Wallet';
    return 'Continue as User';
  };

  // Show loading while checking auth
  if (isCheckingAuth) {
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

  return (
    <View className="flex-1 justify-center bg-black">
      <Image
        source={require('@/assets/images/bg-image.png')}
        resizeMode="cover"
        className="absolute top-0 right-0 left-0 h-1/2"
      />
      <LinearGradient
        colors={['rgba(0,0,0,0.3)', 'rgba(0,0,0,1)', 'rgba(0,0,0,1)']}
        locations={[0, 0.5, 1]}
        className="absolute top-0 right-0 left-0 bottom-0"
      />

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

      {/* Login Buttons */}
      <View className="w-full px-4">
        <View className="flex flex-row items-end gap-2 mt-4">
          <ThemeButton
            variant="primary"
            onPress={handleLoginUser}
            text={getButtonText()}
            LeftIcon={UserIcon}
            disabled={isConnecting || isCheckingAuth}
          />
        </View>

        {/* OR Separator */}
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
            onPress={() => setRegisterModalVisible(true)}
            text="Continue as Merchant"
            LeftIcon={MerchantIcon}
            disabled={isCheckingAuth}
          />
        </View>

        <WalletConnectModal
          projectId={projectId ?? 'defaultProjectId'}
          providerMetadata={providerMetadata}
        />

        <RegisterModal
          visible={isRegisterModalVisible}
          onClose={() => setRegisterModalVisible(false)}
        />
      </View>
    </View>
  );
}
