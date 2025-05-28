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

        console.log('🔍 Checking auth status:', {
          currentRole,
          currentWalletConnected,
          isConnected,
          initialLoadComplete,
        });

        // Case 1: User has role AND wallet is connected (returning user) - SKIP successUser
        if (currentRole && (currentWalletConnected || isConnected)) {
          console.log(
            '🚀 Returning user found! Role:',
            currentRole,
            '- Going directly to tabs'
          );
          setHasNavigated(true);
          router.replace('/(tabs)');
          return;
        }

        // Case 2: User has role but no wallet connection (wallet disconnected externally)
        if (currentRole && !currentWalletConnected && !isConnected) {
          console.log(
            '⚠️ User has role but no wallet connection, clearing role'
          );
          const { clearRole } = useAuthStore.getState();
          clearRole();
        }

        // Case 3: No role or wallet connection (first time or after logout)
        console.log('✅ No valid session found, showing login screen');
        setIsCheckingAuth(false);
      } catch (error) {
        console.error('❌ Error checking auth status:', error);
        setIsCheckingAuth(false);
      }
    };

    checkAuthStatus();
  }, [initialLoadComplete, router]);

  // Separate effect to monitor role changes
  useEffect(() => {
    if (!initialLoadComplete) return;

    console.log('📊 Role or connection changed:', {
      role,
      walletStoreConnected,
      isConnected,
    });

    // If we have a role and wallet connection and haven't navigated yet
    if (
      role &&
      (walletStoreConnected || isConnected) &&
      !hasNavigated &&
      !isCheckingAuth
    ) {
      console.log('🔄 Role/connection changed - redirecting to tabs');
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
      console.log('Login screen focused');
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

  // Navigation logic for wallet connection - UPDATED WITH ROLE CHECK
  useEffect(() => {
    console.log('Connection state:', {
      isConnected,
      hasNavigated,
      isConnecting,
      isCheckingAuth,
      role,
    });

    // FIRST-TIME LOGIN: Wallet connected but no role yet
    if (
      isConnected &&
      !hasNavigated &&
      !isConnecting &&
      !isCheckingAuth &&
      !role
    ) {
      console.log(
        '🔥 First-time wallet connection - no role exists, navigating to successUser'
      );
      setHasNavigated(true);

      setTimeout(() => {
        console.log('Executing navigation to successUser');
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
      console.log(
        '🔥 Returning user - wallet connected and role exists:',
        role,
        '- going directly to tabs'
      );
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
    console.log('Button pressed:', { isConnected, isConnecting });

    if (isConnecting) {
      console.log('Already connecting, ignoring');
      return;
    }

    try {
      if (isConnected && provider) {
        // Disconnect wallet
        console.log('Disconnecting wallet...');
        setIsConnecting(true);
        await provider.disconnect();

        // Reset states after disconnect
        setTimeout(() => {
          setIsConnecting(false);
          setHasNavigated(false);
        }, 1000);
      } else {
        // Connect wallet
        console.log('Opening wallet modal...');
        setIsConnecting(true);
        setHasNavigated(false);

        try {
          await open();
          console.log('Modal opened successfully');
          // Don't reset isConnecting here - let the connection effect handle it
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
